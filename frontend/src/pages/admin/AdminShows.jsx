import React, { useState, useEffect } from 'react';
import './css/AdminShows.css'; // styling below
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


const AdminShows = () => {
  const location = useLocation();
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

  const handleDelete = async (showId) => {
    await axios.delete('http://localhost:5000/api/admin/deleteShow/' + showId)
      .then((response) => {
        alert(response.data.message)
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="show-page">
      <h1 className="page-title float-title">Shows</h1>

      <Link to='/admin/addShow'>
        <button className="add-show-button">
          Add Show
        </button>
      </Link>


      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <div className="shows-movie-title" onClick={() => toggleMovie(movie._id)}>
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
                      <th>Booked Seats</th>
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
                            <td>{100 - show.bookedSeats.length}</td>
                            <td>{show.bookedSeats.length}</td>
                            <td>
                              <button className="delete-button" onClick={() => handleDelete(show._id)}>Delete</button>
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

export default AdminShows;

