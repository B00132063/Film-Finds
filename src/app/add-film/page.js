"use client"
import * as React from "react"
import {Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material"
import {green} from "@mui/material/colors"
import {useState} from "react"

export default function Page() {
    const [answers, setAnswers] = useState(null)

    function findFilm() {
        fetch("api/find-film")
            .then((res) => res.json())
            .then((answers) => setAnswers(answers))
    }

    const theme = createTheme({palette: {secondary: {main: green[500]}}});

    if (!answers) return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography component="h1" variant="h5">FilmFindr</Typography>
                    <Button onClick={() => findFilm()} variant="outlined">Find Film</Button>
                </Box>
            </Container>
        </ThemeProvider>
    )
    else return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography component="h1" variant="h5">FilmFindr</Typography>
                    <div>{answers.map((answer, i) => (<div style={{padding:"20px"}} key = {i}>
                        Text: {answer.text}<br></br>
                        Confidence: {answer.score}
                    </div>))}</div>
                    <Button onClick={() => findFilm()} variant="outlined">Find Film</Button>
                </Box>
            </Container>
        </ThemeProvider>
    )
}