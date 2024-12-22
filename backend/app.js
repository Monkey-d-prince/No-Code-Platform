const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { deployModel, getModels, updateModel } = require('./controllers/deployController');
const { askAI } = require('./controllers/aiController');
const { interactWithModel } = require('./controllers/interactController');

const app = express();
const port = 3000; // Set the port to 3000

app.use(bodyParser.json());
app.use(cors());

app.post('/api/deploy', deployModel);
app.post('/ask', askAI);
app.post('/api/interact', interactWithModel);
app.get('/api/models', getModels);
app.put('/api/models', updateModel);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});