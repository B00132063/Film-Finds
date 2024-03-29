import * as React from "react"
import {
    Box, Button, Container, createTheme, CssBaseline, Typography
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { green } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: green,
    },
});

export default function Page({ data }) {

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
            <Container component="main">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography component="h1" variant="h5">FilmFindr</Typography>
                </Box>
                <DataGrid getRowHeight={() => "auto"} rows={rows} columns={columns}
                          initialState={{pagination: {paginationModel: {pageSize: 5}}}}
                          pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick
                          rowSelection="single"/>
            </Container>
        </ThemeProvider>
    )
}
