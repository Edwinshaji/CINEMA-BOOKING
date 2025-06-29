import React, { useEffect, useState } from "react";
import "./css/Movies.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../../App";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${backendurl}/api/user/getActiveMovies`)
      .then((response) => {
        setMovies(response.data.reverse())
      })
  }, [])

  const handleViewMovie = (movieId) => {
    navigate('/movieDetails', { state: { movieId } })
  }

  const handleBookShow = (movieId) => {
    navigate('/bookShow', { state: { movieId } })
  }

  return (
    <div className="movies-page">
      <div className="movies-banner">
        <h1 className="page-title float-title">Now Showing </h1>
      </div>

      <div className="movies-grid">
        {movies.map((movie,id) => (
          <div className="movie-card" key={id}>
            <img src={`${backendurl}/poster-images/${movie.posterUrl}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Language: {movie.language}</p>
            <button className="view-movie-btn" onClick={(() => { handleViewMovie(movie._id) })}>View Movie</button>
            <button className="book-movie-btn" onClick={(() => { handleBookShow(movie._id) })}>Book Tickets</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;

