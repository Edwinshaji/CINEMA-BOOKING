import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import './App.css'
import { UserContext } from '../context/userContext'

import UserNavBar from './components/user/navbar/UserNavBar'
import AdminNavBar from './components/admin/navbar/AdminNavBar'

import Login from './pages/user/Login'
import Signup from './pages/user/Signup'

import Movies from './pages/user/Movies'
import Bookings from './pages/user/Bookings'
import Account from './pages/user/Account'
import Home from './pages/user/Home'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMovies from './pages/admin/AdminMovies'
import AdminBookings from './pages/admin/AdminBookings'
import AdminShows from './pages/admin/AdminShows'

import AdminRoute from './routes/AdminRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import AddMovie from './components/admin/addMovie/AddMovie'

function App() {
  const location = useLocation();
  const { user, loading } = useContext(UserContext);
  if (loading) return <h1 style={{textAlign:'center',marginTop:100}}>Loading...</h1>;

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserLoggedIn = user && user.role === 'user';
  const isAdminLoggedIn = user && user.role === 'admin';

  return (
    <>
      {/*Showing appropriate navbar */}
      {isUserLoggedIn && <UserNavBar />}
      {isAdminLoggedIn && <AdminNavBar />}
      <Routes>
        {/*Public Routes */}
        <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAdminLoggedIn ? <Login /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        {/*User Routes*/}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

        {/*Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/movies" element={<AdminRoute><AdminMovies /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="/admin/shows" element={<AdminRoute><AdminShows /></AdminRoute>} />
        <Route path="/admin/addMovie" element={<AdminRoute><AddMovie /></AdminRoute>} />
      </Routes>
    </>
  )
}

export default App
