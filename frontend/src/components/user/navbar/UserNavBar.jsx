import React from 'react'
import { Link } from 'react-router-dom';

import './UserNavBar.css'
import logo from '../../../assets/logo.png'

const UserNavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="CineGo Logo" /></Link>
      </div>

      <div className="navbar-links">
        <Link to="/" >
          Home
        </Link>
        <Link to="/movies" >
          Movies
        </Link>
        <Link to="/bookings">
          Bookings
        </Link>
        <Link to="/account">
          Account
        </Link>
      </div>
    </nav>
  )
}

export default UserNavBar
