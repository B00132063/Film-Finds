import React, { useState } from "react";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios"; // Import Axios for making HTTP requests

const theme = createTheme();

export default function MovieSearch() {
    const [searchInput, setSearchInput] = useState("");
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            alert("Please enter a question.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get("/api/films", {
                params: { query: searchInput }
            });
            setFilms(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching movie information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Movie Search
                </Typography>
                <TextField
                    fullWidth
                    label="Ask a question about a movie..."
                    variant="outlined"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search"}
                </Button>
                <List sx={{ marginTop: 2 }}>
                    {films.length > 0 ? (
                        films.map((movie, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${movie.title} - ${movie.plot}`} />
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No movies found." />
                        </ListItem>
                    )}
                </List>
            </Container>
        </ThemeProvider>
    );
}
