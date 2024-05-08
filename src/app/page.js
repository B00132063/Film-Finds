'use client'; // This is a comment to indicate the type of environment or client being used.

import * as React from 'react'; // Importing React library for building UI components.
import CssBaseline from '@mui/material/CssBaseline'; // Importing CssBaseline component from Material-UI to reset browser styling.
import AppBar from '@mui/material/AppBar'; // Importing AppBar component from Material-UI for creating app bars.
import Toolbar from '@mui/material/Toolbar'; // Importing Toolbar component from Material-UI for a toolbar layout.
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI for text styling.
import Button from '@mui/material/Button'; // Importing Button component from Material-UI for buttons.
import TextField from '@mui/material/TextField'; // Importing TextField component from Material-UI for input fields.
import IconButton from '@mui/material/IconButton'; // Importing IconButton component from Material-UI for icon buttons.
import SearchIcon from '@mui/icons-material/Search'; // Importing SearchIcon component from Material-UI for search icon.
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout purposes.
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importing ThemeProvider and createTheme from Material-UI for theming.
import { green, grey } from '@mui/material/colors'; // Importing green and grey colors from Material-UI.

// Import CSS files for slick-carousel
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function Page() { // Defining a React functional component named Page.
  const [searchTerm, setSearchTerm] = React.useState(''); // Initializing state for search term using React.useState hook.

  // Material-UI theme configuration
  const theme = createTheme({ // Creating a custom theme using createTheme function.
    palette: { // Configuring palette for the theme.
      secondary: { // Defining secondary palette color.
        main: green[500], // Setting the main color to green with shade 500.
      },
    },
  });

  const sliderSettings = { // Configuring settings for the image slider.
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  
  return ( // Returning JSX for rendering UI.
    <ThemeProvider theme={theme}> {/* Wrapping the component with ThemeProvider to apply the custom theme. */}
      <CssBaseline /> {/* Applying CssBaseline to reset browser styling. */}
      <Box // Creating a Box component for layout purposes.
        sx={{ // Using sx prop for styling.
          display: 'flex', // Setting display property to flex.
          flexDirection: 'column', // Setting flexDirection property to column.
          justifyContent: 'center', // Setting justifyContent property to center.
          alignItems: 'center', // Setting alignItems property to center.
          height: 'calc(100vh - 64px)', // Setting height property dynamically based on viewport height minus 64px.
          backgroundImage: 'url("background.jpg")', // Setting background image.
          backgroundSize: 'cover', // Setting background size to cover.
          backgroundPosition: 'center', // Setting background position to center.
          pt: 8, // Setting padding top to 8.
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: 'white' }}> {/* Creating Typography component with variant h4 for header text. */}
          Film Findr {/* Text content for the header. */}
        </Typography>
        

        <Slider {...sliderSettings} style={{  maxWidth: '300px', height: '350px' }}> {/* Styling the slider */}
          <div>
            <img src="the amazing spiderman.jpeg" alt="The Amazing Spiderman 1" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="panther.jpg" alt="Panther 2" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="maze.jpg" alt="Maze 3" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="titanic.jpg" alt="Titanic 4" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="grown-ups.jpg" alt="Grown Ups 5" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="grinch.jpg" alt="The Grinch 6" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="rush-hour2.jpg" alt="Rush hour 7" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="mission-impossible.jpg" alt="Mission Impossible 8" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="demon-slayer.jpg" alt="Demon Slayer 9" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="karate.jpeg" alt="The Karate Kid 10" style={{ width: '100%', height: 'auto' }} />
          </div>
        </Slider>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '45%', justifyContent: 'flex-end' }}> {/* Creating a Box for layout purposes. */}
          {/* This box seems to be intended for containing search-related components, but it's currently empty. */}
        </Box>
      </Box>
    </ThemeProvider> /* Closing ThemeProvider component. */
  );
}
