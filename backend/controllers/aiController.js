const aiService = require("../services/aiService");

exports.processText = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await aiService.processText(prompt);
        res.status(200).json({ response: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
