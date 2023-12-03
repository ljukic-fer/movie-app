import React from "react"; 
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Movie App</h1>
            <p>Most popular movies of the day</p>
            <Link to='/movies'>
                <button>Show movies</button>
            </Link>
        </div>
    )
};

export default HomePage;