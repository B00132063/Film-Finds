'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, CssBaseline, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Mock data for demonstration
useEffect(() => {
  fetch("api/getProducts")
      .then((res) => res.json())
      .then((data) => {
          setData(data);
      });
})

const Slideshow = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]); // Make sure to include movies as a dependency

  return (
    <Box>
      <img src={movies[currentSlide].image} alt={movies[currentSlide].title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
    </Box>
  );
};

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <Button color="inherit" href="http://localhost:3000">Home</Button>
          <Button color="inherit" href="/page2">Login</Button>
          <Button color="inherit" href="http://localhost:3000/register">Register</Button>
          <Button color="inherit" href="/page3">Profile</Button>
          <Button color="inherit" href="http://localhost:3000/dashboard">Dashboard</Button>
      </Toolbar>
    </AppBar>
  );
};

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating API call with mock data
    setData(mockMovies);
  }, []);

  if (!data) return <p>Loading...</p>;

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'url("background.jpg")', // Replace "background.jpg" with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <NavBar />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Slideshow component */}
              <Slideshow movies={data} />
            </Grid>
            <Grid item xs={6}>
              {/* Box with movie synopsis */}
              <Grid container spacing={2}>
                {data.map((movie) => (
                  <Grid item xs={12} key={movie.id}>
                    <Box p={2} bgcolor="white" boxShadow={3} textAlign="center">
                      <div>{movie.title}</div>
                      <div>{movie.synopsis}</div>
                      <Button variant="outlined">Add to Cart</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Page;
