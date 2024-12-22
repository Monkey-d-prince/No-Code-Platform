// deployController.js
const { deploySolanaContract } = require('../services/solanaService');
const gptService = require('../services/gptService');

let models = []; // In-memory storage for deployed models

const deployModel = async (req, res) => {
  try {
    const { model_name, model_data } = req.body;
    const contractAddress = await deploySolanaContract({ model_name, model_data });
    models.push({ name: model_name, contractAddress, data: model_data });
    res.json({ contractAddress });
  } catch (error) {
    console.error('Error deploying model:', error); // Log the error details
    res.status(500).json({ error: 'Error deploying model' });
  }
};

const getModels = async (req, res) => {
  res.json({ models });
};

const updateModel = async (req, res) => {
  try {
    const { model_name, model_data } = req.body;
    const model = models.find(m => m.name === model_name);
    if (model) {
      model.data = model_data;
      res.json({ message: 'Model updated successfully' });
    } else {
      res.status(404).json({ error: 'Model not found' });
    }
  } catch (error) {
    console.error('Error updating model:', error); // Log the error details
    res.status(500).json({ error: 'Error updating model' });
  }
};

module.exports = { deployModel, getModels, updateModel };