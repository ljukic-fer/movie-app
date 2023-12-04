import React from "react"; 
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="blur-container">
            <h1>Welcome to the Movie App</h1>
            <p>Most popular movies of the day</p>
            <Link to='/movies'>
                <button>Show movies</button>
            </Link>
        </div>
    )
};

export default HomePage;