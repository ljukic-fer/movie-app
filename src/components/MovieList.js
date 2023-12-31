
import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import axios from 'axios';
import './HomePage.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('popularity');
    const [SortDirection, setSortDirection] = useState('desc');


    useEffect(() => {
        const fetchCredits = async (movieId) => {
            try {
                const creditsResponse = await axios.get(`http://localhost:5000/api/movie/${movieId}/credits`);
                return creditsResponse.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        const fetchMovies = async () => {
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/popular-movies'),
                    axios.get('http://localhost:5000/api/genres'),
                ]);

                const moviesWithCredits = await Promise.all(
                    moviesResponse.data.map(async (movie) => {
                        const credits = await fetchCredits(movie.id);
                        return { ...movie, credits };
                    })
                );

                setMovies(moviesWithCredits);
                setFilteredMovies(moviesWithCredits);
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

    useEffect(() => {
        const sortedMovies = [...movies].sort((a, b) => {
            const aValue = a[sortOption];
            const bValue = b[sortOption];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return SortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return SortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
        })

        setFilteredMovies(
            sortedMovies.filter((movie) => movie.original_title.toLowerCase().includes(filter.toLowerCase()))
        );

        setTimeout(() => {
            document.querySelector('ul').style.transform = 'scale(1)';
        }, 10);
    }, [movies, filter, sortOption, SortDirection]);


    const handleSortChange = (e) => {
        const selectedSortOption = e.target.value;
        setSortOption(selectedSortOption);
    }


    const handleSortButtonClick = () => {
        const newSortDirection = SortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
    }

    const handleScrollToTop = () => {
        animateScroll.scrollToTop({ smooth: true, duration: 500 })
    }


    return (
        <div>
            <h2>Most Popular Movies</h2>
            <div>
                <label>
                    Sort by: {' '}
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value='popularity'>Popularity</option>
                        <option value='original_title'>Title</option>
                        <option value='release_date'>Release date</option>
                    </select>
                </label>
                <label>
                    &nbsp;&nbsp;&nbsp;
                </label>
                <button onClick={handleSortButtonClick} className='button' style={{ fontSize: '14px', padding: '8px 12px' }}>
                    Toggle sort direction
                </button>
                <strong>&nbsp;&nbsp;{SortDirection}</strong>
            </div>
            <input
                type="text"
                placeholder="Filter by movie name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id} className='movie-item'>
                        <div className='movie-image'>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            height={130}
                        />
                        </div>
                        <div className='movie-info'>
                        <strong>Title:</strong> {movie.original_title}
                        <br />
                        <strong>Genre:</strong> {movie.genre_ids
                            .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
                            .join(', ')}
                        <br />
                        <strong>Release Date:</strong> {movie.release_date}
                        <br />
                        <strong>Popularity:</strong> {movie.popularity.toFixed(1)}
                        <br />
                        {movie.credits && (
                            <div>
                                <strong>Actors:</strong> {movie.credits.cast.slice(0, 3).map((actor) => actor.name).join(', ')}
                                <br />
                                <strong>Director:</strong> {movie.credits.crew.find((crew) => crew.job === 'Director').name}
                            </div>
                        )}
                        <hr />
                        </div>
                    </li>
                ))}
            </ul>
            <button className='scroll-to-top-button' onClick={handleScrollToTop}>
                &uarr;
            </button>

        </div>
    );
};

export default MovieList;
