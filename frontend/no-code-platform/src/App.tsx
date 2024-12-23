import React from 'react';
import { AIModelInterface, SmartContractLauncher } from './components';

const App: React.FC = () => {
  return (
    <div>
      <h1>No-Code AI Model and Smart Contract Platform</h1>
      <AIModelInterface />
      <SmartContractLauncher />
    </div>
  );
};

export default App;