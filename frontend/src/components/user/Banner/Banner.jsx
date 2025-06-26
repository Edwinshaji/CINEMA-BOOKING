import React, { useState, useEffect } from 'react';
import '../Banner/Banner.css';
import axios from 'axios';
import { backendurl } from '../../../App';

const Banner = () => {
    const [latestMovies, setLatestMovies] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        axios.get(`${backendurl}/api/user/getLatestMovies`)
            .then((response) => {
                setLatestMovies(response.data);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % latestMovies.length);
        }, 2500); // Change every 2.5s

        return () => clearInterval(interval);
    }, [latestMovies.length]);

    const getIndex = (index) => {
        const total = latestMovies.length;
        return (index + total) % total;
    };

    return (
        <div className="banner-carousel">
            {latestMovies.length > 0 && (
                <>
                    {/* Left */}
                    <div className="carousel-image left">
                        <img src={`${backendurl}/poster-images/${latestMovies[getIndex(current - 1)].posterUrl}`} alt="Left Poster" />
                    </div>

                    {/* Center */}
                    <div className="carousel-image center">
                        <img src={`${backendurl}/poster-images/${latestMovies[getIndex(current)].posterUrl}`} alt="Center Poster" />
                    </div>

                    {/* Right */}
                    <div className="carousel-image right">
                        <img src={`${backendurl}/poster-images/${latestMovies[getIndex(current + 1)].posterUrl}`} alt="Right Poster" />
                    </div>
                </>
            )}
        </div>
    );
};

export default Banner;
