const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const {
    Connection,
    Keypair,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
} = require("@solana/web3.js");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Set up Solana connection to devnet
const connection = new Connection(
    process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",
    "confirmed"
);

// Sample route to check Solana connection
app.get("/", (req, res) => {
    res.send("Solana backend is running");
});

// Route to request SOL to a wallet address
app.post("/request-airdrop", async (req, res) => {
    const { walletAddress } = req.body;
    if (!walletAddress)
        return res.status(400).json({ error: "Wallet address is required" });

    try {
        const publicKey = new Keypair().publicKey;
        const airdropSignature = await connection.requestAirdrop(
            publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airdropSignature);
        res.json({ message: "Airdrop successful" });
    } catch (error) {
        res.status(500).json({ error: "Airdrop failed" });
    }
});

// Route for deploying a program (smart contract) to Solana
app.post("/deploy-contract", async (req, res) => {
    const { contractPath, walletPrivateKey } = req.body;

    if (!contractPath || !walletPrivateKey)
        return res
            .status(400)
            .json({ error: "Contract path and wallet private key are required" });

    try {
        const wallet = Keypair.fromSecretKey(
            new Uint8Array(JSON.parse(walletPrivateKey))
        );
        const programData = fs.readFileSync(contractPath);

        // Create the transaction to deploy the program to Solana
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: wallet.publicKey, // Placeholder, should use a separate public key for the program
                lamports: await connection.getMinimumBalanceForRentExemption(
                    programData.length
                ),
                space: programData.length,
                programId: wallet.publicKey, // Placeholder for actual smart contract programId
            })
        );

        const signature = await connection.sendTransaction(transaction, [wallet]);
        await connection.confirmTransaction(signature);
        res.json({ message: "Smart contract deployed", signature });
    } catch (error) {
        res.status(500).json({ error: "Smart contract deployment failed" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Solana backend server running on port ${PORT}`)
);
