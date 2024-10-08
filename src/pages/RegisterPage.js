import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from '../api/api'; // Adjust the import path based on your folder structure

const RegistrationPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData); 
      setSuccess('Registration successful! You can now log in.');
      setError('');
      setUserData({ username: '', email: '', password: '', phone: '' }); // Reset form

      // Navigate to the login page after successful registration
      navigate('/login'); // Adjust the path based on your routing setup
    } catch (err) {
      setError('Registration failed! Please check your input.');
      setSuccess('');
      console.error("Error registering user:", err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegistrationPage;
