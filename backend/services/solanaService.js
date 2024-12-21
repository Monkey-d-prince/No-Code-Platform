const { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));

exports.getBalance = async (publicKey) => {
    const key = new PublicKey(publicKey);
    const balance = await connection.getBalance(key);
    return balance / LAMPORTS_PER_SOL;
};

exports.sendTransaction = async (fromKey, toKey, amount) => {
    // Logic for sending Solana transactions
    // Add code here for signing and sending transactions
    return "transaction-id-placeholder";
};
