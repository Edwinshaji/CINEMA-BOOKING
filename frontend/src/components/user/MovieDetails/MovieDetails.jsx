import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../../../App";

const MovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movieId,setMovieId] = useState();
  const [movie,setMovie] = useState({});

  useEffect(()=>{
    if(location.state !== null){
      setMovieId(location.state.movieId)
    }

  },[location.state])

  useEffect(()=>{
    axios.get(`${backendurl}/api/user/getSingleMovie/`+movieId)
    .then((response)=>{
      setMovie(response.data);
    })
  })

  const handleBookTicket = (movieId)=>{
    navigate('/bookShow',{state:{movieId}})
  }
  return (
    <div className="movie-details-page">
      <div className="poster">
        <img src={`${backendurl}/poster-images/${movie.posterUrl}`} alt={movie.title} />
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
        <button className="book-button-details" onClick={()=>handleBookTicket(movie._id)}>🎟 Book Ticket</button>
      </div>
    </div>
  );
};

export default MovieDetails;
