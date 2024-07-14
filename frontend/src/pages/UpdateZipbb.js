import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, List, ListItem, ListItemText, IconButton, Tooltip, InputAdornment, Card, CardContent } from '@mui/material';
import { Add, Delete, Info } from '@mui/icons-material';
import axios from 'axios';

const UpdateZipbb = () => {
  const [directories, setDirectories] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const handleAddDirectory = () => {
    let dir = currentDirectory.trim();
    if (dir && !dir.endsWith('/')) {
      dir += '/';
    }
    if (dir) {
      setDirectories([...directories, dir]);
      setCurrentDirectory('');
    }
  };

  const handleAddFile = () => {
    const file = fileName.trim() + (fileExtension.trim() ? `.${fileExtension.trim()}` : '');
    if (file) {
      setFiles([...files, file]);
      setFileName('');
      setFileExtension('');
    }
  };

  const handleRemoveDirectory = (index) => {
    const newDirectories = [...directories];
    newDirectories.splice(index, 1);
    setDirectories(newDirectories);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const content = [...directories, ...files];
    axios.post('http://localhost:5000/api/update-zipbb', { content })
      .then((response) => {
        alert('File updated successfully.');
        setDirectories([]);
        setFiles([]);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update the file.');
      });
  };

  const handleClear = () => {
    axios.post('http://localhost:5000/api/clear-zipbb')
      .then((response) => {
        alert('File cleared successfully.');
        setDirectories([]);
        setFiles([]);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to clear the file.');
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Update .zipbb File
          </Typography>
          <Box component="form" onSubmit={handleUpdate}>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="Add Directory"
                fullWidth
                margin="normal"
                variant="outlined"
                value={currentDirectory}
                onChange={(e) => setCurrentDirectory(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Add a new directory to the list. Directories should end with a '/'">
                        <IconButton>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton color="primary" onClick={handleAddDirectory}>
                <Add />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="File Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Specify the file name. You can leave the extension empty for files like Dockerfile.">
                        <IconButton>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="File Extension"
                fullWidth
                margin="normal"
                variant="outlined"
                value={fileExtension}
                onChange={(e) => setFileExtension(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Specify the file extension. Leave it empty for files without an extension.">
                        <IconButton>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton color="primary" onClick={handleAddFile}>
                <Add />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Directories and Files
            </Typography>
            <List>
              {directories.map((dir, index) => (
                <ListItem key={index} secondaryAction={
                  <Tooltip title="Remove this directory">
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDirectory(index)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                }>
                  <ListItemText primary={dir} />
                </ListItem>
              ))}
              {files.map((file, index) => (
                <ListItem key={index} secondaryAction={
                  <Tooltip title="Remove this file">
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                }>
                  <ListItemText primary={file} />
                </ListItem>
              ))}
            </List>
            <Box mt={2}>
              <Tooltip title="Update the .zipbb file with the current list of directories and files. This will append the new entries to the file.">
                <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                  Update
                </Button>
              </Tooltip>
              <Tooltip title="Clear all content from the .zipbb file.">
                <Button variant="contained" color="secondary" onClick={handleClear}>
                  Clear
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateZipbb;
