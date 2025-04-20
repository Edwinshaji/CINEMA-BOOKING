import React, { useState, useEffect } from 'react';
import './Banner.css'; // Importing the CSS

const images = [
    'https://i.redd.it/wgsajydj1r3d1.jpeg',
    'https://static.toiimg.com/thumb/msid-113501216,width-1280,height-720,resizemode-4/113501216.jpg',
    'https://pbs.twimg.com/media/E_iq1p1VUAcuIDJ.jpg:large'
];

const Banner = () => {
    // current variable is used as the index of the image array
    const [current, setCurrent] = useState(0);
    // length of the array
    const length = images.length;

    // eveery time the component mounted the useEffect works
    useEffect(() => {
        // using setInterval function is a timer function after every 5 seconds the value of the current is incremented by 1 
        // and after reaching the array length the current is set to 0 to iterate again to the first image 
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % length);
        }, 5000);
        // clearInterval function is used to clear the timer
        return () => clearInterval(interval);
    }, [length]);

    return (
        <div className="banner">
            <div className="banner-slider">
                {images.map((img, index) => (
                    <div
                        className={`slide ${index === current ? 'active' : ''}`}
                        key={index}
                    >
                        {index === current && <img src={img} alt={`Slide ${index + 1}`} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;

