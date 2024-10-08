import React from 'react';
import { Container, Typography, Button, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';

// Create a custom theme for your application
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color for buttons
    },
    secondary: {
      main: '#dc004e', // Secondary color for outlined buttons
    },
  },
  typography: {
    fontWeightBold: 700, // Make font weight bold
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth="md" 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: '#f5f5f5', // Light background color
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Welcome to Our Movie App!
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Discover and review your favorite movies with our community.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/registerpage" 
            size="large"
            sx={{ 
              padding: '12px 24px', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
            }}
          >
            Sign Up
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            component={Link} 
            to="/login" 
            size="large"
            sx={{ 
              padding: '12px 24px', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
            }}
          >
            Log In
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
