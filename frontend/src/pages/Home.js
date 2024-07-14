import React, { useState } from 'react';
import { Container, Typography, Button, Box, Tooltip, IconButton, Card, CardContent } from '@mui/material';
import { Info } from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleQuickStart = () => {
    fetch('http://localhost:5000/zipbb-quickstart')
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:5000/api/upload-zipbb', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        alert('File uploaded successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('File upload failed');
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Start Zipping!
          </Typography>
          <Box mb={4}>
            <Tooltip title="Click to start the quickstart process">
              <Button variant="contained" color="primary" onClick={handleQuickStart}>
                Quickstart
              </Button>
            </Tooltip>
          </Box>
          <Typography variant="h6" gutterBottom>
            Upload .zipbb File
            <Tooltip title="Select a .zipbb file from your computer to upload">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Typography>
          <input
            accept=".zipbb"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose File
            </Button>
          </label>
          <Tooltip title="Upload the selected .zipbb file to the server">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpload}
              disabled={!selectedFile}
              sx={{ ml: 2 }}
            >
              Upload
            </Button>
          </Tooltip>
          {selectedFile && <Typography variant="body2" mt={2}>{selectedFile.name}</Typography>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
