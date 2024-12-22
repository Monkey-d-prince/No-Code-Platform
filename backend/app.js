// filepath: /Users/ramjigupta/Desktop/No-Code-Platform/backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { deployModel, getModels, updateModel } = require('./controllers/deployController');
const { askAI } = require('./controllers/aiController');
const { interactWithModel } = require('./controllers/interactController');
const aiRoute = require('./routes/aiRoute');

const app = express();
const port = 3000; // Set the port to 3000

app.use(bodyParser.json());
app.use(cors());

app.post('/api/deploy', deployModel);
app.post('/api/ask', askAI); // Ensure the endpoint is correctly defined
app.post('/api/interact', interactWithModel);
app.get('/api/models', getModels);
app.put('/api/models', updateModel);
app.use('/api', aiRoute);

// Global error handler (optional but recommended)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});