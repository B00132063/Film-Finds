'use client';
import * as React from 'react';
import { useState } from 'react';
import {
  Button, TextField, Typography, Container, CssBaseline, Box, Link, Checkbox, FormControlLabel, Grid, Avatar, Paper, Tooltip, ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default function Page() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, telephone }),
      });
  
      if (response.ok) {
        console.log('User registered successfully');
      } else {
        const data = await response.json();
        console.error('Registration error:', data.message);
      }
    };
  
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container component="main" maxWidth="md">
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
              <Typography component="h1" variant="h5">
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
               <span>We would love to hear from you and get ideas on how we can improve. We'll reply as soon as possible.</span>
              </Typography>
    
              <Paper elevation={3} sx={{ mt: 2, width: '100%', minHeight: 450 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '80%', mx: 'auto' }}>
                      <Tooltip title="Please fill out this field" placement="right">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label={<span><b>Username</b></span>}  // Changing `<b>` to `<span>` to avoid potential HTML issues.
                          name="username"
                          autoComplete="username"
                          autoFocus
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Tooltip>
                      <Tooltip title="Please fill out this field" placement="right">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label={<span><b>Email</b></span>}  // Changing `<b>` to `<span>` here too.
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                       </Tooltip>

                      <Tooltip title="Please fill out this field" placement="right">
                      <TextField
                        margin="normal"
                        fullWidth
                        name="telephone"
                        label={<span><b>Telephone</b></span>}  // Similarly, updating here.
                        type="tel"
                        id="telephone"
                        autoComplete="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                       </Tooltip>

                       <Tooltip title="Please share your thoughts" placement="right">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="message"
                          label={<span><b>Message</b></span>}
                          type="text"
                          id="message"
                          multiline
                          rows={4}  // Adjust the number of rows as needed
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </Tooltip>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Send Message
                      </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" align="center">
                     This message will be taken into careful consideration by the Film Findr team.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }
