import React, { useState } from 'react';
import './AddMovie.css';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    language: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Movie:', formData);
    // Here you would usually send formData to a backend or API
  };

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" required onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" rows="4" required onChange={handleChange}></textarea>

        <label>Duration (in minutes)</label>
        <input type="number" name="duration" required onChange={handleChange} />

        <label>Language</label>
        <input type="text" name="language" required onChange={handleChange} />

        <label>Upload Poster</label>
        <input type="file" name="image" accept="image/*" required onChange={handleChange} />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
