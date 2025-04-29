import React, { useContext, useState } from 'react';
import './css/Account.css'; // We'll create this CSS next
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfile from '../../components/user/EditProfile/EditProfile';
import ChangePassword from '../../components/user/ChangePassword/ChangePassword';
import avatar from '../../assets/avatar.jpg'

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext)
  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const [changePassPopup, setChangePassPopup] = useState(false);

  const handleEditProfile = async (newName) => {
    await axios.put('http://localhost:5000/api/user/editProfile/' + user._id, { newName })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    await axios.put(`http://localhost:5000/api/user/changePassword/${user._id}`, { oldPassword, newPassword })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Something went wrong!")
      })
  };

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/api/user/logout', { withCredentials: true })
      .then(() => {
        navigate('/')
        window.location.reload();
      })
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="user-info">
          <img
            src={avatar}
            alt="User Avatar"
            className="avatar"
          />
          <h2 className="username">{user.name}</h2>
          <p className="useremail">{user.email}</p>
        </div>

        <div className="account-options">
          <button className="account-btn" onClick={() => setEditProfilePopup(true)}>
            Edit Profile
          </button>
          <button className="account-btn" onClick={() => setChangePassPopup(true)}>
            Change Password
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {editProfilePopup && (
        <EditProfile
          initialName={user.name}
          onClose={() => setEditProfilePopup(false)}
          onSave={handleEditProfile}
        />
      )}
      {changePassPopup && (
        <ChangePassword
          onClose={() => setChangePassPopup(false)}
          onSave={handleChangePassword}
        />
      )}
    </div>
  );
};

export default Account;
