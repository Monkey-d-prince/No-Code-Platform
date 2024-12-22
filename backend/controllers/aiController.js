// aiController.js
const gptService = require('../services/gptService');

const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await gptService.getAnswer(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Error getting answer from AI' });
  }
};

module.exports = { askAI };