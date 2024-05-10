import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Make sure the port and the endpoint are correct
    fetch('http://localhost:3000/movies')
      .then(response => {
        console.log('HTTP response:', response);
        if (!response.ok) {
          // Throws an error with the status code if the response is not OK
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use text() to initially receive the response as text
      })
      .then(text => {
        try {
          const data = JSON.parse(text); // Try to parse the text as JSON
          console.log('Data received:', data);
          setMovies(data);
        } catch (err) {
          // Catches parsing errors and logs the text that was not JSON
          console.error('Error parsing JSON:', text);
          throw err;
        }
      })
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie._id}>
              {movie.title} - Directed by {movie.director} (Released in {movie.releaseYear})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
