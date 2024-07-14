import React from 'react';
import { AppBar, Toolbar,  Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo image

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ height: '80px' }}>
      <Toolbar sx={{ height: '100%' }}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <IconButton component={Link} to="/" sx={{ p: 0 }}>
            <img src={logo} alt="ZipBB Logo" style={{ height: '60px', marginRight: '16px' }} />
          </IconButton>
          
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/update-zipbb">
            Update Zipbb
          </Button>
          <Button color="inherit" component={Link} to="/run-zipbb">
            Run Zipbb
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
