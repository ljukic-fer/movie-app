import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/popular-movies');
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Most Popular Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>Title:</strong> {movie.original_title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
