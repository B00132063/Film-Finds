import React from "react";
import { Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom"; // Import Link for navigation

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const rows = [
    { id: 1, title: "Film 1", year: 2022 },
    { id: 2, title: "Film 2", year: 2023 },
    { id: 3, title: "Film 3", year: 2024 },
];

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "year", headerName: "Year", width: 110 },
];

const handlePopup = () => {
    // Dummy function for handling button click
    alert("Displaying movie data in popup");
};

export default function MyComponent() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
                {/* Header */}
                <Box my={4} textAlign="center">
                    <Typography variant="h2" component="h1" gutterBottom>FilmFindr</Typography>
                    {/* Navigation Links */}
                    <Box mb={2}>
                        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
                    </Box>
                </Box>

                {/* Search Bar */}
                <Box mb={4} textAlign="center">
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        fullWidth
                        // Add any search functionality here
                    />
                </Box>

                {/* Data Grid */}
                <DataGrid
                    getRowHeight={() => "auto"}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelection="single"
                    autoHeight
                />

                {/* Button */}
                <Box mt={4} textAlign="center">
                    <Button variant="contained" onClick={handlePopup}>Display Movie Data in Popup</Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
