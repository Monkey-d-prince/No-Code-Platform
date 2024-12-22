// aiController.js
const gptService = require('../services/gptService');

const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Received question:', question); // Log the received question

    if (!question) {
      console.error('No question provided');
      return res.status(400).json({ error: 'No question provided' });
    }

    const answer = await gptService.getAnswer(question);
    console.log('AI answer:', answer); // Log the AI answer
    res.json({ answer });
  } catch (error) {
    console.error('Error getting answer from AI:', error.response ? error.response.data : error.message); // Log the error details
    res.status(500).json({ error: 'Error getting answer from AI' });
  }
};

module.exports = { askAI };