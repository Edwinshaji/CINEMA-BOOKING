import React, { useEffect, useState } from 'react';
import './AddMovie.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    language: '',
    poster_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster_image') {
      setFormData({ ...formData, poster_image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('duration', formData.duration);
    data.append('language', formData.language);
    data.append('poster_image', formData.poster_image);

    if (location.state != null) {
      axios.put('http://localhost:5000/api/admin/editMovie/' + location.state.values._id, data).then((response) => {
        alert(response.data.message)
        navigate('/admin/movies')
      })
    } else {

      axios.post('http://localhost:5000/api/admin/addMovie', data)
        .then((response) => {
          alert(response.data.message)
          navigate('/admin/movies')
        })
        .catch((err) => {
          console.log(err)
        })
    }

  };

  useEffect(() => {
    if (location.state != null) {
      setFormData({
        ...formData,
        title: location.state.values.title,
        description: location.state.values.description,
        duration: location.state.values.duration,
        language: location.state.values.language,
        poster_image:location.state.values.posterUrl
      })
    }
  },[])

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form className="add-movie-form" onSubmit={submitHandler} encType="multipart/form-data">
        <label>Title</label>
        <input type="text" name="title" required onChange={handleChange} value={formData.title} />

        <label>Description</label>
        <textarea name="description" rows="4" required onChange={handleChange} value={formData.description}></textarea>

        <label>Duration (in minutes)</label>
        <input type="number" name="duration" required onChange={handleChange} value={formData.duration} />

        <label>Language</label>
        <input type="text" name="language" required onChange={handleChange} value={formData.language} />

        <label>Upload Poster</label><br />
        {formData.poster_image != null && (
          <img className='poster-image' src={`http://localhost:5000/poster-images/${formData.poster_image}`} alt="poster image" />
        )}
        <input type="file" name="poster_image" accept="image/*" required onChange={handleChange} />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
