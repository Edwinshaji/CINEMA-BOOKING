import React, { useEffect, useState } from "react";
import "./css/Movies.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/getActiveMovies')
      .then((response) => {
        setMovies(response.data)
      })
  }, [])

  const handleViewMovie = (movieId) => {
    navigate('/movieDetails', { state: { movieId } })
  }

  return (
    <div className="movies-page">
      <div className="movies-banner">
        <h1 className="page-title float-title">Now Showing </h1>
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={`http://localhost:5000/poster-images/${movie.posterUrl}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Language: {movie.language}</p>
            <button className="view-movie-btn" onClick={(() => { handleViewMovie(movie._id) })}>View Movie</button>
            <button className="book-movie-btn">Book Tickets</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;

