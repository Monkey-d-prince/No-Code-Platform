// components/ModelList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState('');
  const [modelData, setModelData] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/models');
        setModels(res.data.models);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    fetchModels();
  }, [updateSuccess]); // Re-fetch models when updateSuccess changes

  const handleUpdate = async (e) => {
    e.preventDefault();
    const model = models.find(m => m.name === modelName);
    if (!model) {
      alert('Model not found');
      return;
    }
    try {
      await axios.put('http://localhost:3000/api/models', {
        model_name: modelName,
        model_data: JSON.parse(modelData), // Assuming modelData is the new model data
      });
      alert('Model updated successfully');
      setUpdateSuccess(prev => !prev); // Toggle updateSuccess to trigger re-fetch
    } catch (error) {
      alert('Error updating model');
    }
  };

  return (
    <div>
      <h2>Deployed Models</h2>
      <ul>
        {models.map((model) => (
          <li key={model.name}>
            <strong>{model.name}</strong> - {model.contractAddress}
            <pre>{JSON.stringify(model.data, null, 2)}</pre>
          </li>
        ))}
      </ul>
      <h3>Update Model</h3>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Model</button>
      </form>
    </div>
  );
};

export default ModelList;