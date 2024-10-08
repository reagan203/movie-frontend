import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  CircularProgress,
  Snackbar,
  Box, // Add Box for layout
} from '@mui/material';
import { fetchMovies, fetchReviews, createReview } from '../api/api'; // Adjust the import path based on your folder structure
import { useUser } from '../UserContext'; // Import the useUser hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const HomePage = () => {
  const { user, token } = useUser(); // Access user and token from context
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await fetchMovies(token); // Pass token for authenticated requests
        setMovies(response.data); // Assuming response.data contains the list of movies
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [token]); // Fetch movies when the token changes

  const handleOpenDialog = async (movie) => {
    setSelectedMovie(movie);
    try {
      const response = await fetchReviews(movie.id, token); // Pass token for authenticated requests
      setReviews(response.data); // Assuming response.data contains the list of reviews
    } catch (error) {
      setError('Error fetching reviews. Please try again later.');
      console.error('Error fetching reviews:', error);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMovie(null);
    setReviews([]);
    setReviewContent('');
    setReviewRating(0);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewContent || reviewRating <= 0) {
      alert('Please provide both content and a rating for your review.');
      return;
    }

    const reviewData = {
      content: reviewContent,
      rating: reviewRating,
      user_id: user?.id, // Get user ID from context
    };

    try {
      await createReview(selectedMovie.id, reviewData, token); // Pass token for authenticated requests
      const response = await fetchReviews(selectedMovie.id, token); // Pass token for authenticated requests
      setReviews(response.data);
      setReviewContent('');
      setReviewRating(0);
    } catch (error) {
      setError('Error submitting review. Please try again later.');
      console.error('Error submitting review:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box display="flex" justifyContent="flex-start" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/movie')} // Adjust to the correct route for Movie.js
            >
              Go to Movies
            </Button>
          </Box>
          <Typography variant="h4" gutterBottom>
            Home
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the Movie App! Here you can browse and discover new movies, add reviews, and much more.
          </Typography>
          <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {movies.map((movie) => (
              <Card key={movie.id} sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={movie.image_url || 'https://via.placeholder.com/300x140.png?text=No+Image'} // Placeholder image
                  alt={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {movie.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                </CardContent>
                <Button size="small" onClick={() => handleOpenDialog(movie)} sx={{ margin: 2 }}>
                  View Reviews
                </Button>
              </Card>
            ))}
          </Container>

          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
            <DialogTitle>{selectedMovie ? selectedMovie.title : ''} - Reviews</DialogTitle>
            <DialogContent>
              <Typography variant="h6">User Reviews</Typography>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id}>
                    <Typography variant="body2">{review.content}</Typography>
                    <Rating value={review.rating} readOnly />
                  </div>
                ))
              ) : (
                <Typography variant="body2">No reviews available for this movie.</Typography>
              )}
              <form onSubmit={handleSubmitReview}>
                <TextField
                  label="Your Review"
                  fullWidth
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  margin="normal"
                />
                <Rating
                  value={reviewRating}
                  onChange={(event, newValue) => setReviewRating(newValue)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit Review
                </Button>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error}
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;
