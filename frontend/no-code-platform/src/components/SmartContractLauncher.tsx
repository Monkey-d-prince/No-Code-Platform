import React, { useState } from 'react';
import { deployContract, getContractStatus } from '../services/blockchainService';

const SmartContractLauncher: React.FC = () => {
    const [contractCode, setContractCode] = useState<string>('');
    const [deploymentStatus, setDeploymentStatus] = useState<string>('');
    const [contractAddress, setContractAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeploy = async () => {
        if (!contractCode.trim()) {
            setDeploymentStatus('Please enter valid smart contract code.');
            return;
        }

        setIsLoading(true);
        setDeploymentStatus('');
        try {
            const address = await deployContract(contractCode);
            setContractAddress(address);
            setDeploymentStatus('Contract deployed successfully!');
        } catch (error: any) {
            setDeploymentStatus('Deployment failed: ' + (error.message || error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckStatus = async () => {
        if (!contractAddress) {
            setDeploymentStatus('No contract address found. Please deploy a contract first.');
            return;
        }

        setIsLoading(true);
        setDeploymentStatus('');
        try {
            const status = await getContractStatus(contractAddress);
            setDeploymentStatus(`Contract status: ${status}`);
        } catch (error: any) {
            setDeploymentStatus('Error fetching status: ' + (error.message || error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Smart Contract Launcher</h2>
            <textarea
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                placeholder="Enter your smart contract code here"
                style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '10px', fontSize: '14px' }}
                disabled={isLoading}
            />
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={handleDeploy}
                    disabled={isLoading}
                    style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isLoading ? 'Deploying...' : 'Deploy Contract'}
                </button>
                <button
                    onClick={handleCheckStatus}
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isLoading ? 'Checking...' : 'Check Status'}
                </button>
            </div>
            <p style={{ color: deploymentStatus.startsWith('Error') ? 'red' : 'green' }}>
                {deploymentStatus}
            </p>
        </div>
    );
};

export default SmartContractLauncher;
