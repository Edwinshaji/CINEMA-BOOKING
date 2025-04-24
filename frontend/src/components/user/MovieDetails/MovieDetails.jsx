import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const movie = {
  title: "The Lost Kingdom",
  duration: "2h 15m",
  language: "English",
  description:
    "In a world where ancient secrets awaken, one hero embarks on a journey to reclaim the throne of a forgotten realm. With breathtaking visuals and a heart-pounding story, 'The Lost Kingdom' is an epic tale of courage, betrayal, and destiny.",
  poster: "https://via.placeholder.com/1200x600?text=The+Lost+Kingdom+Poster",
};

const MovieDetails = () => {
  const location = useLocation();
  const [movieId,setMovieId] = useState();
  const [movie,setMovie] = useState({});

  useEffect(()=>{
    if(location.state !== null){
      setMovieId(location.state.movieId)
    }

  },[location.state])

  useEffect(()=>{
    axios.get('http://localhost:5000/api/user/getSingleMovie/'+movieId)
    .then((response)=>{
      setMovie(response.data);
    })
  })
  return (
    <div className="movie-details-page">
      <div className="poster">
        <img src={`http://localhost:5000/poster-images/${movie.posterUrl}`} alt={movie.title} />
      </div>

      <div className="details">
        <h1>{movie.title}</h1>
        <div className="meta">
          <span>⏱ {movie.duration} Minutes</span>
          <span>🌐 {movie.language}</span>
        </div>
        <div>
        <p className="description">{movie.description}</p>
        </div>
        <button className="book-button-details">🎟 Book Ticket</button>
      </div>
    </div>
  );
};

export default MovieDetails;
