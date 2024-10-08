import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from '../UserContext'; // Import the useUser hook

const LoginPage = () => {
  const { login } = useUser(); // Get the login function from context
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add handleChange to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
        const response = await fetch('http://localhost:5000/login', { // Updated URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            setError(data.message); // Set error from response
            setSuccess('');
        } else {
            const data = await response.json();
            login(data.token); // Call login from context with JWT token
            setSuccess('Login successful!');
            setError('');
            navigate('/home'); // Navigate to home page
        }
    } catch (err) {
        setError('An error occurred. Please try again later.'); // General error message
        setSuccess('');
        console.error("Error logging in:", err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange} // Call handleChange to update state
          fullWidth
          margin="normal"
          required
          autoComplete="email" // Added autocomplete attribute for email
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange} // Call handleChange to update state
          fullWidth
          margin="normal"
          required
          autoComplete="current-password" // Added autocomplete attribute for password
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
