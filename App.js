import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([
    { title: "Spiderman", director: "Unknown", releaseYear: "Unknown", _id: "spiderman" },
    { title: "Batman", director: "Unknown", releaseYear: "Unknown", _id: "batman" },
    // Add more predefined movies here
  ]);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        // Update allMovies based on the fetched data
        const updatedMovies = allMovies.map(movie => {
          const found = data.find(m => m.title === movie.title);
          return found || movie;
        });
        setAllMovies(updatedMovies);
      })
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies Catalogue</h1>
        <ul>
          {allMovies.map(movie => (
            <li key={movie._id} style={{ color: movie.director === "Unknown" ? "red" : "green" }}>
              {movie.title} - {movie.director === "Unknown" ? "Not in database" : `Directed by ${movie.director} (Released in ${movie.releaseYear})`}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
