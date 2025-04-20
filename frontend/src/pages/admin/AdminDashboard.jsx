import React, { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/userContext'

function AdminDashboard() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/api/user/logout', { withCredentials: true })
      .then((response) => {
        setUser(null)
        navigate('/login')
      })
      .catch((error) => {
        console.log("Logout Failed : ", error);
      })
  }
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminDashboard
