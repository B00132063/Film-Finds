// Import React and necessary hooks and components from the React and Material-UI libraries
'use client'
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, CssBaseline, AppBar, Toolbar, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Define the Dashboard component
const Dashboard = () => {
    // State variables to hold movies data and search term
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Effect hook to fetch movies data when component mounts
    useEffect(() => {
        fetchMovies();
    }, []);

    // Function to fetch movies data from the API
    const fetchMovies = (query = '') => {
        let url = 'http://localhost:3000/api/getfilms';
        if (query) {
            url += `?query=${query}`;
        }
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMovies(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    };

    // Function to handle search button click event
    const handleSearch = () => {
        fetchMovies(searchTerm);
    };

    // Theme customization using MUI's createTheme function
    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });

    // Render the Dashboard component
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    {/* Search input field */}
                    <TextField
                        label="Search movies"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Search button */}
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Toolbar>
            </AppBar>
            {/* Container for displaying movie data */}
            <Container>
                <Grid container spacing={2}>
                    {/* Mapping through movies array to display each movie */}
                    {movies.map((movie) => (
                        <Grid item xs={12} key={movie._id}>
                            {/* Box containing movie information */}
                            <Box p={2} bgcolor="white" boxShadow={3} textAlign="center">
                                <div>Title: {movie.title}</div>
                                <div>Year: {movie.year}</div>
                                <div>Rated: {movie.rated}</div>
                                <div>Released: {movie.released}</div>
                                <div>Runtime: {movie.runtime}</div>
                                <div>Genre: {movie.genre}</div>
                                <div>Director: {movie.director}</div>
                                <div>Writer: {movie.writer}</div>
                                <div>Actors: {movie.actors}</div>
                                <div>Plot: {movie.plot}</div>
                                <div>Language: {movie.language}</div>
                                <div>Country: {movie.country}</div>
                                <div>Awards: {movie.awards}</div>
                                {/* Image displaying movie poster */}
                                <img src={movie.poster} alt={movie.title} style={{ width: '100%' }} />
                                {/* Button to add movie to profile */}
                                <Button variant="outlined">Add to Profile</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

// Export the Dashboard component as default
export default Dashboard;
