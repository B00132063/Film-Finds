'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Material-UI theme configuration
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  // Function for handling search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search execution
  const handleSearchExecute = () => {
    console.log("Search query:", searchTerm);
    // Add your search execution logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Film Findr
          </Typography>
          <Button color="inherit" href="http://localhost:3009">Home</Button>
          <Button color="inherit" href="/page2">Login</Button>
          <Button color="inherit" href="http://localhost:3010/register">Register</Button>
          <Button color="inherit" href="/page3">Profile</Button>
          <Button color="inherit" href="http://localhost:3010/dashboard">Dashboard</Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Adjust height based on AppBar height
          backgroundImage: 'url("background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pt: 8, // Padding top to push the content below AppBar
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
          Film Findr
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '45%', justifyContent: 'flex-end' }}>
          <TextField
            id="search-bar"
            variant="outlined"
            placeholder="Search for movies/questions?"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: '75%', // Adjust the width as needed
              input: { color: 'white', fontWeight: 'bold' }, // Styles the text color inside the search bar
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'blue', // Styles the border color
                },
                '&:hover fieldset': {
                  borderColor: 'red', // Styles the border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green', // Styles the border color on focus
                },
              },
            }}
            InputProps={{
              style: { fontWeight: 'bold' }, // Makes the placeholder text bold
            }}
            fullWidth // Makes the TextField full width
          />
          <IconButton onClick={handleSearchExecute} sx={{ color: 'white' }}>
            <SearchIcon />
         </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
