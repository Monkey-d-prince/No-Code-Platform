const { processText } = require('../services/aiService');

exports.askAI = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const data = await processText(prompt);
    // Extract message content from Monster API response
    const answer = data.choices && data.choices.length > 0 
      ? data.choices[0].message.content 
      : 'No response from AI';

    res.json({ answer });
  } catch (err) {
    console.error('Error getting answer from AI:', err.message);
    res.status(500).json({ error: `Error getting answer from AI: ${err.message}` });
  }
};