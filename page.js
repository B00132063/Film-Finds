'use client'
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, CssBaseline, AppBar, Toolbar, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = (query = '') => {
        let url = 'http://localhost:3001/api/getfilms';
        if (query) {
            url += `?query=${query}`;
        }
        console.log("Fetching movies from:", url);
        fetch(url)
            .then((res) => {
                console.log("Response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Received movies data:", data);
                setMovies(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    };

    const handleSearch = () => {
        console.log("Search term:", searchTerm);
        fetchMovies(searchTerm);
    };

    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <TextField
                        label="Search movies"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={2}>
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    {movies.map((movie) => (
                        <Grid item xs={12} key={movie._id}>
                            <Box p={2} bgcolor="white" boxShadow={3} textAlign="center">
                                <div>Title: {movie.title}</div>
                                <div>Year: {movie.year}</div>
                                {/* Display other movie details */}
                                <img src={movie.poster} alt={movie.title} style={{ width: '100%' }} />
                                <Button variant="outlined">Add to Profile</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;
