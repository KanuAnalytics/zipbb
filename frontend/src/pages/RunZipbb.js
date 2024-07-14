import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, Card, CardContent, Tooltip, IconButton } from '@mui/material';
import axios from 'axios';
import { Info } from '@mui/icons-material';

const RunZipbb = () => {
  const [zipbbContent, setZipbbContent] = useState('');
  const [numCharacters, setNumCharacters] = useState('');
  const [fileExists, setFileExists] = useState(false);
  const [scriptsData, setScriptsData] = useState('');
  const [scriptsDataExists, setScriptsDataExists] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/get-zipbb-content')
      .then(response => {
        if (response.data.exists) {
          setZipbbContent(response.data.content);
          setFileExists(true);
        } else {
          setZipbbContent('The .zipbb file does not exist. Please run the quickstart or upload a file from the home page.');
          setFileExists(false);
        }
      })
      .catch(error => {
        console.error('Error fetching the .zipbb file content:', error);
      });

    axios.get('http://localhost:5000/api/get-scripts-data')
      .then(response => {
        if (response.data.exists) {
          setScriptsData(response.data.content);
          setScriptsDataExists(true);
        } else {
          setScriptsData('The scripts_data.json file does not exist.');
          setScriptsDataExists(false);
        }
      })
      .catch(error => {
        console.error('Error fetching the scripts_data.json file content:', error);
      });
  }, []);

  const handleRunZipbb = () => {
    const url = numCharacters ? `http://localhost:5000/api/run-zipbb?chars=${numCharacters}` : 'http://localhost:5000/api/run-zipbb';
    axios.post(url)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error running the zipbb command:', error);
        alert('Failed to run the zipbb command.');
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Run Zipbb
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom>
              .zipbb File Contents
            </Typography>
            <Tooltip title="This section displays the contents of the .zipbb file if it exists.">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
          <Box mb={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {zipbbContent}
            </Typography>
          </Box>
          {fileExists && (
            <Box component="form" onSubmit={handleRunZipbb}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  Run Zipbb Command
                </Typography>
                <Tooltip title="Use this form to specify the number of characters to be processed by the zipbb command.">
                  <IconButton>
                    <Info />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                label="Number of Characters"
                fullWidth
                margin="normal"
                variant="outlined"
                value={numCharacters}
                onChange={(e) => setNumCharacters(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Specify the number of characters for the zipbb command. Leave empty to process without a limit.">
                      <IconButton>
                        <Info />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
              <Tooltip title="Click to run the zipbb command with the specified number of characters.">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRunZipbb}
                  sx={{ mt: 2 }}
                >
                  Run Zipbb
                </Button>
              </Tooltip>
            </Box>
          )}
          <Box display="flex" alignItems="center" mt={4} mb={2}>
            <Typography variant="h6" gutterBottom>
              scripts_data.json File Contents
            </Typography>
            <Tooltip title="This section displays the contents of the scripts_data.json file if it exists.">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
          <Box mb={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {scriptsData}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RunZipbb;
