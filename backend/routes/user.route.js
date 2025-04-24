import express from 'express'
import { changePassword, editProfile, getUser, userLogin, userLogout, userSignup } from '../controllers/user.controller.js';
import { getActiveMovies, getAllMovies, getSingleMovie } from '../controllers/movie.controller.js';
import { bookTicket, cancelTicket, getTickets } from '../controllers/booking.controller.js';

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

router.post("/signup",userSignup); //user signup api

router.post("/login",userLogin); //user login api

router.get('/getuser',getUser) //api to access details of user to every single page 

router.get('/logout',userLogout)

router.put('/editProfile/:id',editProfile) // api for edit the user name

router.put('/changePassword/:id',changePassword) // api for changing the password of the user

router.get('/getActiveMovies',getActiveMovies); //api to get only active movies

router.get('/getSingleMovie/:id',getSingleMovie); // api for getting a single movie details with the movie ID

router.get('/getAllMovies',getAllMovies); // api for getting all movies from the databse

router.post('/bookTicket',bookTicket) // api for booking the ticket

router.put('/cancelTicket/:userId/:bookingId',cancelTicket) // api for cancelling the ticket

router.get('/getTickets/:userId',getTickets) // api for getting tickets of a particular user with user Id

export default router;
