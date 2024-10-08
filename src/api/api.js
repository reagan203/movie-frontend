import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};

export const loginUser = (loginData) => {
    return axios.post(`${API_URL}/login`, loginData);
};

export const fetchMovies = (token) => {
    return axios.get(`${API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createMovie = (movieData, token) => {
    return axios.post(`${API_URL}/movies`, movieData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteMovie = (id, token) => {
    return axios.delete(`${API_URL}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchReviews = (movie_id, token) => {
    return axios.get(`${API_URL}/movies/${movie_id}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createReview = (movie_id, reviewData, token) => {
    return axios.post(`${API_URL}/movies/${movie_id}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteReview = (movie_id, review_id, token) => {
    return axios.delete(`${API_URL}/movies/${movie_id}/reviews/${review_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


