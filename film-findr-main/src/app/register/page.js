"use client"
import * as React from "react"
import {
    Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography
} from "@mui/material"
import {green} from "@mui/material/colors";

export default function Page() {
    async function asynchronousDatabaseCall(url) {
        const response = await fetch(url)
        const data = await response.json()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let email = data.get("email")
        let pass = data.get("pass")

        asynchronousDatabaseCall(`api/register?email=${email}&pass=${pass}`)
    }

    const theme = createTheme({palette: {secondary: {main: green[500]}}})

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main"}}></Avatar>
                    <Typography component="h1" variant="h5">Register</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address"
                                   name="email" autoComplete="email" autoFocus/>
                        <TextField margin="normal" required fullWidth id="pass" label="Password"
                                   name="pass" autoComplete="current-password" type="pass"/>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="../login" variant="body2">
                                    {"Already registered? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}