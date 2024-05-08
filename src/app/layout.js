import { Inter } from 'next/font/google' // Importing the Inter font from Google Fonts via next/font/google.
import './globals.css' // Importing global CSS styles from a file named 'globals.css'.
import { metadata } from './metadata'; // Importing metadata from a separate file.

import AppBar from "@mui/material/AppBar"; // Importing the AppBar component from Material-UI.
import Toolbar from "@mui/material/Toolbar"; // Importing the Toolbar component from Material-UI.
import Typography from "@mui/material/Typography"; // Importing the Typography component from Material-UI.
import Button from "@mui/material/Button"; // Importing the Button component from Material-UI.
import * as React from "react"; // Importing React.

const inter = Inter({ subsets: ['latin'] }); // Initializing the Inter font with the Latin subset.

export default function RootLayout({ children }) { // Defining a functional component named RootLayout with children as a parameter.
    return (
        // HTML root element with lang attribute set to 'en'.
        // Material-UI AppBar component with static position.
        // Toolbar component for navigation links.
        // Site title text.
        // Button component for adding a film.
        // Button component for navigating to the home page.
        // Button component for navigating to the login page.
        // Button component for navigating to the registration page.
        // Button component for navigating to the profile page.
        // Button component for navigating to the dashboard page.
        // Rendering children components.
        <html lang="en"> 
        <body className={inter.className}> 
        <AppBar position="static"> 
            <Toolbar> 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
                    Film Findr
                </Typography>
                <Button color="inherit" href="http://localhost:3000/add-film">Add-Film</Button> 
                <Button color="inherit" href="http://localhost:3000">Home</Button> 
                <Button color="inherit" href="/login">Login</Button> 
                <Button color="inherit" href="http://localhost:3000/register">Register</Button> 
                <Button color="inherit" href="http://localhost:3000/profile">Profile</Button> 
                <Button color="inherit" href="http://localhost:3000/dashboard">Dashboard</Button> 
            </Toolbar>
        </AppBar>

        {children} 
        </body>
        </html>
    );
}
