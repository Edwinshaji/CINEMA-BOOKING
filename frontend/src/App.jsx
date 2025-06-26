import { Route, Routes, Navigate, useLocation, Router } from 'react-router-dom'
import { useContext, useEffect } from 'react'
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
import AddShow from './components/admin/addShow/AddShow'
import ListBookings from './components/admin/listBookings/ListBookings'
import MovieDetails from './components/user/MovieDetails/MovieDetails'
import BookShow from './components/user/BookShow/BookShow'
import Footer from './components/user/Footer/Footer'
import TicketScanner from './components/admin/ticketScanner/TicketScanner'

export const backendurl = 'http://localhost:5000';

function App() {
  const location = useLocation();
  const { user, loading } = useContext(UserContext);
  if (loading) return <h1 style={{ textAlign: 'center', marginTop: 100 }}>Loading...</h1>;

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserLoggedIn = user && user.role === 'user';
  const isAdminLoggedIn = user && user.role === 'admin';

  return (
    <>
      {/*Showing appropriate navbar */}
      {isAdminLoggedIn ? <AdminNavBar /> : <UserNavBar user={user} />}

      <Routes>
        {/*Public Routes */}
        <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAdminLoggedIn ? <Login /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path='/movieDetails' element={<MovieDetails />} />

        {/*User Routes*/}
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path='/bookShow' element={<ProtectedRoute><BookShow /></ProtectedRoute>} />

        {/*Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/movies" element={<AdminRoute><AdminMovies /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="/admin/shows" element={<AdminRoute><AdminShows /></AdminRoute>} />
        <Route path="/admin/addMovie" element={<AdminRoute><AddMovie /></AdminRoute>} />
        <Route path='/admin/addShow' element={<AdminRoute><AddShow /></AdminRoute>} />
        <Route path='/admin/listBookings' element={<AdminRoute><ListBookings /></AdminRoute>} />
        <Route path='/admin/ticketScanner' element={<AdminRoute><TicketScanner /></AdminRoute>} />
      </Routes>

      {isUserLoggedIn && <Footer />}

    </>
  )
}

export default App
