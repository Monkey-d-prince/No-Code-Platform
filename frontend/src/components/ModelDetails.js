// components/ModelDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const ModelDetails = () => {
  const { name } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/models/${name}`);
        setModel(res.data.model);
      } catch (error) {
        console.error('Error fetching model details:', error);
      }
    };
    fetchModel();
  }, [name]);

  return (
    <Container>
      {model ? (
        <>
          <Typography variant="h4">{model.name}</Typography>
          <Typography variant="body1">Contract Address: {model.contractAddress}</Typography>
          <Typography variant="body1">Configuration: {JSON.stringify(model.configuration)}</Typography>
          <Typography variant="body1">Usage Statistics: {JSON.stringify(model.usageStatistics)}</Typography>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
};

export default ModelDetails;