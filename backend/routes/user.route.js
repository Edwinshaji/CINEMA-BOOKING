import express from 'express'
import { changePassword, editProfile, getProfile, userLogin, userSignup } from '../controllers/user.controller.js';
import { getAllMovies, getSingleMovie } from '../controllers/movie.controller.js';
import { bookTicket, cancelTicket } from '../controllers/booking.controller.js';

const router = express.Router();

router.post("/signup",userSignup); //user signup api

router.post("/login",userLogin); //user login api

router.get('/profile',getProfile) //api to access details of user to every single page 

router.put('/editProfile/:id',editProfile) // api for edit the user name

router.put('/changePassword/:id',changePassword) // api for changing the password of the user

router.get('/getSingleMovie/:id',getSingleMovie); // api for getting a single movie details with the movie ID

router.get('/getAllMovies',getAllMovies); // api for getting all movies from the databse

router.post('/bookTicket',bookTicket) // api for booking the ticket

router.put('/cancelTicket/:userId/:bookingId',cancelTicket) // api for cancelling the ticket

export default router;
