'use client'
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Mock data for demonstration
const mockMovies = [
  { id: 1, title: 'Movie 1', image: 'panther.jpg', synopsis: 'Synopsis of Movie 1' },
  { id: 2, title: 'Movie 2', image: 'grown-ups.jpeg', synopsis: 'Synopsis of Movie 2' },
  { id: 3, title: 'Movie 3', image: 'titanic.jpeg', synopsis: 'Synopsis of Movie 3' },
  { id: 4, title: 'Movie 4', image: 'spiderman.jpeg', synopsis: 'Synopsis of Movie 4' },
  { id: 5, title: 'Movie 5', image: 'maze.jpeg', synopsis: 'Synopsis of Movie 5' }
];

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
