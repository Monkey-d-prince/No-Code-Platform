// controllers/modelController.js
let models = [
  { name: 'Model1', contractAddress: 'address1' },
  { name: 'Model2', contractAddress: 'address2' },
];

const getModels = async (req, res) => {
  res.json({ models });
};

const deleteModel = async (req, res) => {
  const { name } = req.params;
  models = models.filter(model => model.name !== name);
  res.json({ message: 'Model deleted successfully' });
};

const updateModel = async (req, res) => {
  const { name } = req.params;
  const { newName, newContractAddress } = req.body;
  const model = models.find(model => model.name === name);
  if (model) {
    model.name = newName || model.name;
    model.contractAddress = newContractAddress || model.contractAddress;
    res.json({ message: 'Model updated successfully' });
  } else {
    res.status(404).json({ message: 'Model not found' });
  }
};

module.exports = { getModels, deleteModel, updateModel };