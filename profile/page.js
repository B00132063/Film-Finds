import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
    // Example data (You might fetch this from a database or state management in a real app)
    const moviesSeen = [
        { title: 'Inception', date: '2024-01-18' },
        { title: 'Interstellar', date: '2024-02-03' },
        { title: 'Grown Ups 2', date: '2024-03-08' },
        { title: 'Joker', date: '2024-03-28' },
        { title: 'Aquaman', date: '2024-04-22' },
        { title: 'The Idea Of You', date: '2024-05-01' },
    ];

    const moviesAdded = [
        { title: 'The Dark Knight', date: '2024-01-23' },
        { title: 'Suicide Squad', date: '2021-02-05' },
        { title: 'Millers Girl', date: '2021-03-15' },
        { title: 'Magic Mike', date: '2021-03-27' },
        { title: 'Uncharted', date: '2021-04-22' },
        { title: 'Kung Fu Panda', date: '2021-05-01' },
    ];

    // Function to render rows for a table
    const renderRows = (data) => data.map((movie, index) => (
        <TableRow key={index}>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.date}</TableCell>
        </TableRow>
    ));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            pt: 8,
        }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                User Profile
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 650, mt: 4 }}>
                <Table aria-label="movies seen table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Movies Seen</TableCell>
                            <TableCell>Date Seen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows(moviesSeen)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ maxWidth: 650, mt: 4 }}>
                <Table aria-label="movies added table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Movies Added</TableCell>
                            <TableCell>Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows(moviesAdded)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
