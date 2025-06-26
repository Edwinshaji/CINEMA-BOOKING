import React, { useEffect, useState } from 'react'
import './css/AdminMovies.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../../App';

function AdminMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${backendurl}/api/admin/getAllMovies`)
      .then((response) => {
        setMovies(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const editHandler = async (values) => {
    navigate('/admin/addMovie', { state: { values } })
  }

  const removeHandler = async (id) => {
    await axios.get(`${backendurl}/api/admin/deactivateMovie/` + id)
      .then((response) => {
        toast.success(response.data.message)
      })
      .catch((err) => {
        toast.error('Something went wrong!')
      })

    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }

  const liveHandler = async (id) => {
    await axios.get(`${backendurl}/api/admin/activateMovie/` + id)
      .then((response) => {
        toast.success(response.data.message)
      })
      .catch((err) => {
        toast.error('Something went wrong!')
      })

    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }

  const deleteHandler = async (id) => {
    await axios.delete(`${backendurl}/api/admin/deleteMovie/` + id)
      .then((response) => {
        toast.success(response.data.message)
        window.location.reload();
      })
      .catch((err) => {
        toast.error('Something went wrong!')
      })

    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }

  const bookHandler = (movieId) => {
    navigate('/bookShow', { state: { movieId } })
  }

  return (
    <div className="movies-container">
      <h1 className="page-title float-title">Movies</h1>

      <div className="movies-header">
        <Link to='/admin/addMovie'><button className="add-button">Add Movie</button></Link>
      </div>
      <hr />
      <h2 className="movies-title">Currently Running Movies</h2>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map((movie, id) => {
              if (movie.isActive) {
                return (
                  <tr key={id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.language}</td>
                    <td>
                      <button className='edit-btn' onClick={() => { editHandler(movie) }}>Edit</button>&nbsp;&nbsp;
                      <button className='remove-btn' onClick={() => { removeHandler(movie._id) }}>Remove</button>&nbsp;&nbsp;
                      <button className='book-show-btn' onClick={() => { bookHandler(movie._id) }}>Book Seats</button>
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>

      {/**for showing no longer movies */}
      <h2 className="movies-title">No longer in theaters</h2>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Language</th>
            <th>Edit / Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map((movie, id) => {
              if (movie.isActive === false) {
                return (
                  <tr key={id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.language}</td>
                    <td><button className='live-btn' onClick={() => { liveHandler(movie._id) }}>Live</button>&nbsp;&nbsp;<button className='delete-btn' onClick={() => { deleteHandler(movie._id) }}>delete</button></td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdminMovies
