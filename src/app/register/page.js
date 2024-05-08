'use client'
import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link, Checkbox, FormControlLabel, Grid, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

const theme = createTheme();

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, telephone }),
    });

    if (response.ok) {
      console.log('User registered successfully');
      // Handle successful registration (e.g., show success message, redirect to login page)
    } else {
      const data = await response.json();
      console.error('Registration error:', data.message);
      // Handle registration error (e.g., display error message)
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

            <Typography component="h1" variant="h5">
              Register
            </Typography>

            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
              Please fill in this form to create an account.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Tooltip title="Please fill out this field" placement="right">
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              </Tooltip>

              <Tooltip title="Please fill out this field" placement="right">
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />
              </Tooltip>

              <Tooltip title="Please fill out this field" placement="right"> 
              <TextField
                  margin="normal"
                  fullWidth
                  name="telephone"
                  label="Telephone"
                  type="tel"
                  id="telephone"
                  autoComplete="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
              />
              </Tooltip>


              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />

              <Typography variant="body2" color="textSecondary" align="center">
                By creating an account you agree to our <Link href="http://localhost:3000/T&C">Terms & Conditions</Link>.
              </Typography>

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}
