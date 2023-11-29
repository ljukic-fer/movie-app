import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filter, setFilter] = useState('');


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/popular-movies'),
                    axios.get('http://localhost:5000/api/genres'),
                ]);
                setMovies(moviesResponse.data);
                setFilteredMovies(moviesResponse.data);
                setGenres(genresResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) => movie.original_title.toLowerCase().includes(filter.toLowerCase()))
        );
    }, [movies, filter]);

    return (
        <div>
            <h2>Most Popular Movies</h2>
            <input
                type="text"
                placeholder="Filter by movie name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id}>
                        <strong>Title:</strong> {movie.original_title}
                        <br />
                        <strong>Genre:</strong> {movie.genre_ids
                            .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
                            .join(', ')}
                        <br />
                        <strong>Release Date:</strong> {movie.release_date}
                        <br />
                        {movie.credits && (
                            <div>
                                <strong>Actors:</strong> {movie.credits.cast.slice(0, 3).map((actor) => actor.name).join(', ')}
                                <br />
                                <strong>Director:</strong> {movie.credits.crew.find((crew) => crew.job === 'Director').name}
                            </div>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
