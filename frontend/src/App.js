// App.js
import React from 'react';
import AskAI from './components/AskAi';
import DeployModel from './components/DeployModel';
import InteractWithModel from './components/InteractWithModel';
import ModelList from './components/ModelList';

const App = () => {
  return (
    <div>
      <h1>Simplified Blockchain and AI App</h1>
      <AskAI />
      <DeployModel />
      <InteractWithModel />
      <ModelList />
    </div>
  );
};

export default App;