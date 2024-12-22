// components/DeployModel.js
import React, { useState } from 'react';
import axios from 'axios';

const DeployModel = () => {
  const [modelName, setModelName] = useState('');
  const [modelData, setModelData] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelName || !modelData) {
      setError('Model Name and Model Data are required');
      return;
    }
    try {
      JSON.parse(modelData); // Validate JSON format
    } catch (e) {
      setError('Model Data must be valid JSON');
      return;
    }
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/deploy', {
        model_name: modelName,
        model_data: JSON.parse(modelData), // Parse JSON before sending
      });
      setResponse(`Contract Address: ${res.data.contractAddress}`);
      // Refresh the model list
      window.location.reload();
    } catch (error) {
      setError(`Error deploying model: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div>
      <h2>Deploy Model</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Model Name:</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </div>
        <div>
          <label>Model Data:</label>
          <textarea
            value={modelData}
            onChange={(e) => setModelData(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Deploy</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default DeployModel;