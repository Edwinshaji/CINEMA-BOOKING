import React, { useEffect, useState } from 'react'
import './css/AdminMovies.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function AdminMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/getAllMovies')
      .then((response) => {
        setMovies(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const handleEdit = ()=>{

  }

  const removeHandler = async(id)=>{
    await axios.get('http://localhost:5000/api/admin/deactivateMovie/'+id)
    .then((response)=>{
      console.log(response)
      alert(response.data.message)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const liveHandler = async(id)=>{
    await axios.get('http://localhost:5000/api/admin/activateMovie/'+id)
    .then((response)=>{
      alert(response.data.message)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="movies-container">
      <div className="movies-header">
        <Link to='/admin/addMovie'><button className="add-button">Add Movie</button></Link>
      </div>
      <hr />
      <h2 class="movies-title">Currently Running Movies</h2>
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
            movies.map((movie) => {
              if (movie.isActive) {
                return (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.language}</td>
                    <td><button className='edit-btn' onClick={handleEdit}>Edit</button>&nbsp;&nbsp;<button className='remove-btn' onClick={()=>{removeHandler(movie._id)}}>Remove</button></td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>

      {/**for showing no longer movies */}
      <h2 class="movies-title">No longer in theaters</h2>
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
            movies.map((movie) => {
              if (movie.isActive === false) {
                return (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.language}</td>
                    <td><button className='live-btn' onClick={()=>{liveHandler(movie._id)}}>Live</button>&nbsp;&nbsp;<button className='edit-btn'>Edit</button>&nbsp;&nbsp;<button className='delete-btn' onClick={()=>{liveHandler(movie._id)}}>delete</button></td>
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
