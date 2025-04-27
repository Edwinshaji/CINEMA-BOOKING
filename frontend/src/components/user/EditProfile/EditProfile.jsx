import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile= ({ initialName, onClose, onSave }) => {
  const [newName, setNewName] = useState(initialName);

  const handleSave = () => {
    onSave(newName);
    onClose()
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Edit Profile</h2>

        <input
          type="text"
          className="name-input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
