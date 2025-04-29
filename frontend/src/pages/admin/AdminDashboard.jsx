import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/userContext'
import './css/AdminDashboard.css'

function AdminDashboard() {
  const { setUser } = useContext(UserContext);
  const [dateTime, setDateTime] = useState(new Date());
  const [runningMovies, setRunningMovies] = useState(); 
  const [todaysShows, setTodaysShows] = useState(); 
  const [ticketsSold,setTicketsSold] = useState();

  const navigate = useNavigate();

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    return `${day}-${month}-${year} | ${time}`;
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    axios.get('http://localhost:5000/api/admin/getActiveMovies')
      .then((response) => {
        setRunningMovies(response.data.length)
      })
    axios.post('http://localhost:5000/api/admin/getShowsByDate', { date: new Date().toISOString().split('T')[0] })
      .then((response) => {
        setTodaysShows(response.data.length)
      })
    axios.get('http://localhost:5000/api/admin/getTodaysBookingCount')
    .then((response)=>{
      setTicketsSold(response.data)
      console.log(response.data);
      
    })

    return () => clearInterval(timer);
  },[]);

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/api/user/logout', { withCredentials: true })
      .then((response) => {
        setUser(null)
        navigate('/')
        window.location.reload()
      })
      .catch((error) => {
        console.log("Logout Failed : ", error);
      })
  }
  return (
    <div className="admin-container">
      <h1 className="page-title float-title">Admin Dashboard</h1>

      <div className="date-time-banner">
        {formatDateTime(dateTime)}
      </div>

      <div className="info-row">
        <div className="info-block">🎥 Running Movies: {runningMovies}</div>
        <div className="info-block">🗓️ Today's Shows: {todaysShows}</div>
      </div>

      <div className="info-row">
        <div className="info-block">📊 Occupancy Rate: 78%</div>
        <div className="info-block">🎟️ Tickets Sold Today: {ticketsSold}</div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>

  );
}

export default AdminDashboard

