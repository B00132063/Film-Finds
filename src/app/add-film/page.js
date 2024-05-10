'use client'

import React, { useState, useEffect } from "react";
import {
    Box, Button, Container, createTheme, CssBaseline, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, TextField, ThemeProvider, Typography, Grid, Card, CardContent
} from "@mui/material";
import { green } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import RootLayout from "@/app/layout";

export default function Page() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [responseHolder, setResponseHolder] = useState("");

    const theme = createTheme({ palette: { secondary: { main: green[500] } } });

    useEffect(() => {
        fetch("http://localhost:3000/api/getfilms")
            .then(res => res.json())
            .then(data => {
                // Assign a unique 'id' property to each row
                const newData = data.map((row, index) => ({ ...row, id: index + 1 }));
                setData(newData);
            });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const filmTitle = formData.get("film-title");
        asynchronousDatabaseCall(`api/add-film?film-title=${encodeURIComponent(filmTitle)}`);
    };

    const asynchronousDatabaseCall = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success && data.newFilm) {
            setData(prev => [...prev, data.newFilm]);
        }
        setResponseHolder(data.message || "Error occurred!");
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const columns = [
        { field: "title", headerName: "Title", width: 150 },
        { field: "year", headerName: "Year", width: 100 },
        { field: "runtime", headerName: "Runtime", width: 100 },
        { field: "language", headerName: "Language", width: 100 },
        { field: "country", headerName: "Country", width: 100 },
        { field: "genre", headerName: "Genre", width: 130 },
        { field: "director", headerName: "Director", width: 130 },
        { field: "plot", headerName: "Plot", width: 200 },
        { field: "awards", headerName: "Awards", width: 150 },
        { field: "poster", headerName: "Poster", width: 130, renderCell: (params) => (<img src={params.value} alt="Poster" style={{ width: 50 }} />) },
    ];

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Response"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {responseHolder}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>Close</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Container component="main">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography component="h1" variant="h5">Add Film</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="film-title" label="Film Title" name="film-title" autoComplete="film-Title" autoFocus />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Film</Button>
                    </Box>
                </Box>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    autoHeight
                />
            </Container>
        </ThemeProvider>
    );
}