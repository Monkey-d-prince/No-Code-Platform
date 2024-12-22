import React, { useState } from 'react';
import axios from 'axios';

function AskAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInteract = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/ask', {
        prompt: question
      });
      setResponse(res.data.answer);
      setError('');
    } catch (error) {
      console.error('Error interacting with AI:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Failed to get response from AI');
    }
  };

  return (
    <div>
      <h1>Ask Monster AI</h1>
      <textarea
        placeholder="Type your question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleInteract}>Ask AI</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <p><strong>Response:</strong> {response}</p>}
    </div>
  );
}

export default AskAI;