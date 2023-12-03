import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import MovieList from './components/MovieList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/movies' element={<MovieList />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
