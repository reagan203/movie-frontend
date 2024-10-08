import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createMovie, fetchMovies, deleteMovie } from '../api/api'; // Adjust the import path based on your folder structure

const MoviePage = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    description: '',
    image_url: '',
  });
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch movies on component mount
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetchMovies(); // Call your fetchMovies API
        setMovies(response.data); // Assuming response.data contains the list of movies
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError('Failed to fetch movies.');
      }
    };

    fetchAllMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(movieData); // Call the createMovie API
      setSuccess('Movie added successfully!');
      setError('');

      // Fetch updated movie list
      const response = await fetchMovies();
      setMovies(response.data);
      setMovieData({ title: '', genre: '', description: '', image_url: '' }); // Reset form
    } catch (err) {
      setError('Failed to add movie! Please check your input.');
      setSuccess('');
      console.error("Error adding movie:", err);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId); // Call the deleteMovie API
      setSuccess('Movie deleted successfully!');

      // Fetch updated movie list
      const response = await fetchMovies();
      setMovies(response.data);
    } catch (err) {
      setError('Failed to delete movie.');
      setSuccess('');
      console.error("Error deleting movie:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Movie Management
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Genre"
          name="genre"
          value={movieData.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={movieData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <TextField
          label="Image URL"
          name="image_url"
          value={movieData.image_url}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Movie
          </Button>
        </Box>
      </form>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Movies List
      </Typography>
      <List>
        {movies.map((movie) => (
          <ListItem key={movie.id} sx={{ mb: 2 }}>
            <Card sx={{ display: 'flex', width: '100%' }}>
              {movie.image_url && (
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={movie.image_url}
                  alt={movie.title}
                />
              )}
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {movie.genre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description}
                </Typography>
              </CardContent>
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={() => handleDelete(movie.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MoviePage;
