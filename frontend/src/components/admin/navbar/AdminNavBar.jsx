import React from 'react'
import { Link } from 'react-router-dom';

import './AdminNavBar.css'
import logo from '../../../assets/logo.png'

const AdminNavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/admin/dashboard"><img src={logo} alt="CineGo Logo" /></Link>
            </div>
                
            <div className="navbar-links">
                <Link to="/admin/dashboard" >
                    Admin Dashboard
                </Link>
                <Link to="/admin/movies" >
                    Movies
                </Link>
                <Link to="/admin/shows">
                    Shows
                </Link>
                <Link to="/admin/bookings">
                    Bookings
                </Link>
            </div>
        </nav>
    )
}

export default AdminNavBar
