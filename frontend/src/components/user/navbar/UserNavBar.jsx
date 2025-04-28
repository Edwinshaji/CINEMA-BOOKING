import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';
import logo from '../../../assets/logo.png';

const UserNavBar = ({user}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // reset menu open on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="CineGo Logo" />
        </Link>
      </div>

      {/* Toggle Button only on Mobile */}
      {isMobile && (
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}

      {/* Nav links */}
      <div className={`navbar-links ${isMobile ? (isMenuOpen ? 'active' : 'hidden') : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/bookings">Bookings</Link>
        {user ? (
          <Link to="/account">Account</Link>
        ):(
          <Link to="/login">Login</Link>
        )}
        
      </div>
    </nav>
  );
};

export default UserNavBar;
