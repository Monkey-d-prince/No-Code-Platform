const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.MONSTER_API_KEY;
const MODEL_ENDPOINT = process.env.MONSTER_API_ENDPOINT;

exports.processText = async (prompt) => {
  if (!apiKey) {
    throw new Error('Monster API key is not configured');
  }

  try {
    console.log('Sending request to Monster API with prompt:', prompt);

    const response = await axios.post(
      MODEL_ENDPOINT,
      {
        messages: [
          { role: "user", content: prompt }
        ],
        model: "microsoft/Phi-3-mini-4k-instruct",
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Received response from Monster API:', response.data);
    
    // Ensure the response data is properly formatted before returning
    if (!response.data.choices || !response.data.choices[0].message) {
      throw new Error('Invalid response format from Monster API');
    }
    
    return response.data;
  } catch (error) {
    console.error('Monster API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.detail?.[0]?.msg || 'Failed to process request');
  }
};