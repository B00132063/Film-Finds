"use client"
import * as React from "react"
import {
    Box, Button, Container, createTheme, CssBaseline, TextareaAutosize, ThemeProvider, Typography
} from "@mui/material"
import {green} from "@mui/material/colors"

export default function Page() {
    const theme = createTheme({palette: {secondary: {main: green[500]}}});

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography component="h1" variant="h5">FilmFindr</Typography>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
