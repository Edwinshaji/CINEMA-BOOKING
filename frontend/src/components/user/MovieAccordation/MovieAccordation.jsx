import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieAccordation.css'

function MovieAccordation() {
    const navigate = useNavigate();
    const [latestMovies, setLatestMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);


    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleMovieClick = (movieId) => {
        navigate('/movieDetails', { state: { movieId } })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/getLatestMovies')
            .then((response) => {
                setLatestMovies(response.data)
            })
    }, [])

    return (
        <div>
            <h2 className="section-title">Latest Movies</h2>
            <div className="accordion-slider">
                {latestMovies.map((movie, index) => (
                    <div
                        key={index}
                        className={`accordion-panel ${activeIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                        onClick={() => { handleMovieClick(movie._id) }}
                    >
                        <img src={`http://localhost:5000/poster-images/${movie.posterUrl}`} alt={movie.title} />
                        <div className="accordion-content">
                            <h3>{movie.title}</h3>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieAccordation
