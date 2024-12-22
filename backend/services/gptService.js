const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const interactWithGPT = async (input) => {
  // Implementation for interacting with GPT model
  // This is a placeholder implementation
  return `GPT response to: ${input}`;
};

const getAnswer = async (question) => {
  try {
    console.log('Getting answer for question:', question); // Log the question
    // Replace the placeholder implementation with actual GPT model interaction
    const response = await axios.post('https://api.openai.com/v1/chat/completions`', {
      prompt: question,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Replace with your actual API key
        'Content-Type': 'application/json',
      },
    });
    console.log('Response from GPT API:', response.data); // Log the response from GPT API
    const answer = response.data.choices[0].text.trim();
    console.log('Generated answer:', answer); // Log the generated answer
    return answer;
  } catch (error) {~
    console.error('Error in getAnswer:', error.response ? error.response.data : error.message); // Log the error details
    throw new Error('Error in getAnswer');
  }
};

module.exports = { interactWithGPT, getAnswer };