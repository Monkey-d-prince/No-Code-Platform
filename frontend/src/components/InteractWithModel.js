// components/InteractWithModel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractWithModel = () => {
  const [modelName, setModelName] = useState('');
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [models, setModels] = useState([]);

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const model = models.find(m => m.name === modelName);
    if (!model) {
      alert('Model not found');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/api/interact', {
        model_name: modelName,
        input_data: inputData,
      });
      const interaction = {
        modelName,
        inputData,
        response: res.data.response,
      };
      setHistory([interaction, ...history]);
      setResponse(`Model Response: ${res.data.response}`);
    } catch (error) {
      setResponse('Error interacting with model');
    }
  };

  return (
    <div>
      <h2>Interact with Model</h2>
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
          <label>Input Data:</label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
        <button type="submit">Interact</button>
      </form>
      {response && <p>{response}</p>}
      <h3>Interaction History</h3>
      <ul>
        {history.map((interaction, index) => (
          <li key={index}>
            Model: {interaction.modelName}, Input: {interaction.inputData}, Response: {interaction.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InteractWithModel;