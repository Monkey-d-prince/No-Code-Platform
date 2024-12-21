const solanaService = require("../services/solanaService");

exports.getBalance = async (req, res) => {
    try {
        const { publicKey } = req.query;
        const balance = await solanaService.getBalance(publicKey);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendTransaction = async (req, res) => {
    try {
        const { fromKey, toKey, amount } = req.body;
        const transactionId = await solanaService.sendTransaction(
            fromKey,
            toKey,
            amount
        );
        res.status(200).json({ transactionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
