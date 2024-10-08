import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie App
        </Typography>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Button color="inherit">Home</Button>
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        ) : (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
