'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';

export default function Page() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
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
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Typography variant="h3" align="center" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    {data.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Box p={2} border={1} borderRadius={4}>
                                <Typography variant="h5">{item.pname}</Typography>
                                <Typography variant="body1">Price: {item.price}</Typography>
                                <Button variant="outlined" fullWidth>Add to Cart</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
