import React, { useState } from 'react';
import axios from 'axios';

const AskAI = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const askAI = async () => {
    const res = await axios.post('http://localhost:3000/ask', { query });
    setResponse(res.data.response);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Ask something"
      />
      <button onClick={askAI}>Ask AI</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default AskAI;
