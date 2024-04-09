"use client"
import * as React from "react"
import {
    Box, Button, Container, createTheme, CssBaseline, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, TextField, ThemeProvider, Typography
} from "@mui/material"
import {green} from "@mui/material/colors"
import { DataGrid } from "@mui/x-data-grid"
import {useEffect, useState} from "react";

export default function Page() {
    async function asynchronousDatabaseCall(url) {
        const response = await fetch(url)
        const data = await response.json()

        let responseMessage = data.message
        setResponseHolder(responseMessage)
        if (responseMessage.length > 0) setOpen(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let filmTitle = data.get("film-title")

        asynchronousDatabaseCall(`api/add-film?film-title=${filmTitle}`)
    }

    const [data, setData] = useState(null)
    const [open, setOpen] = React.useState(false)
    const [responseHolder, setResponseHolder] = React.useState(false)

    useEffect(() => {
        fetch("api/get-films")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    const handleClose = () => setOpen(false)

    const theme = createTheme({palette: {secondary: {main: green[500]}}});

    let rows = []
    if (data) rows = data.map((item) => ({
        id: item._id, title: item.title, year: item.year, rated: item.rated, released: item.released,
        runtime: item.runtime, genre: item.genre, director: item.director, writer: item.writer,
        actors: item.actors, plot: item.plot, language: item.language, country: item.country,
        awards: item.awards, poster: item.poster
    }))

    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {field: "title", headerName: "Title", width: 100},
        {field: "year", headerName: "Year", width: 100},
        {field: "rated", headerName: "Rated", width: 100},
        {field: "released", headerName: "Released", width: 100},
        {field: "runtime", headerName: "Runtime", width: 100},
        {field: "genre", headerName: "Genre", width: 100},
        {field: "director", headerName: "Director", width: 100},
        {field: "writer", headerName: "Writer", width: 100},
        {field: "actors", headerName: "Actors", width: 100},
        {field: "plot", headerName: "Plot", width: 400},
        {field: "language", headerName: "Language", width: 100},
        {field: "country", headerName: "Country", width: 100},
        {field: "awards", headerName: "Awards", width: 100},
        {field: "poster", headerName: "Poster", width: 100}
    ]

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {responseHolder}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions><Button onClick={handleClose} autoFocus>Close</Button></DialogActions>
                </Dialog>
            </React.Fragment>

            <Container component="main">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography component="h1" variant="h5">Add Film</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField margin="normal" required fullWidth id="film-title" label="Film Title"
                           name="film-title" autoComplete="film-Title" autoFocus/>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Add Film
                        </Button>
                    </Box>
                </Box>

                <DataGrid getRowHeight={() => "auto"} rows={rows} columns={columns}
                          initialState={{pagination: {paginationModel: {pageSize: 5}}}}
                          pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick
                          rowSelection="single"/>
            </Container>
        </ThemeProvider>
    )
}
