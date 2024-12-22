import React, { useState } from 'react';
import axios from 'axios';

function AskAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleInteract = async () => {
    try {
      console.log('Sending question:', question); // Log the question being sent
      const res = await axios.post('http://localhost:3000/api/ask', { question }); // Ensure the endpoint is correct
      console.log('Received response:', res.data); // Log the response received
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error interacting with AI:', error);
      alert('Error interacting with AI');
    }
  };

  return (
    <div>
      <h1>Ask AI</h1>
      <textarea
        placeholder="Type your question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleInteract}>Ask AI</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default AskAI;