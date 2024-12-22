// controllers/interactController.js
const interactWithModel = async (req, res) => {
  try {
    const { model_name, input_data } = req.body;
    const response = await gptService.interactWithModel(model_name, input_data);
    res.json({ response });
  } catch (error) {
    console.error('Error interacting with model:', error); // Log the error details
    res.status(500).json({ error: 'Error interacting with model' });
  }
};

module.exports = { interactWithModel };