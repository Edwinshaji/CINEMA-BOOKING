import React, { useState, useEffect } from 'react';
import './css/AdminBookings.css'; // styling below
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/getActiveMovies')
      .then((response) => {
        setMovies(response.data)
      })
  }, []);

  const toggleMovie = async (movieId) => {
    await axios.get('http://localhost:5000/api/admin/getShowsSingleMovie/' + movieId)
      .then((response) => {
        setShows(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  const handleViewBooking = async (showId) => {
    navigate('/admin/listBookings', { state : {showId} })
  }

  return (
    <div className="show-page">
      <h1 className="page-title float-title">Bookings</h1>

      <Link to='/admin/addShow'>
        <div className="btn-wrapper">
          <button className="book-btn">Book Seats</button>
        </div>
      </Link>


      <div className="movie-list">
        
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <div className="movie-title" onClick={() => toggleMovie(movie._id)}>
              🎬 {movie.title}
            </div>

            {expandedMovieId === movie._id && (
              <div className="show-list">
                <table className="show-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Available Seats</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shows
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((show) => {
                        return (
                          <tr key={show.id}>
                            <td>{show.date.split('T')[0]}</td>
                            <td>{show.time}</td>
                            <td>{show.seats}</td>
                            <td>
                              <button className="view-booking-button" onClick={() => handleViewBooking(show._id)}>View Bookings</button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;