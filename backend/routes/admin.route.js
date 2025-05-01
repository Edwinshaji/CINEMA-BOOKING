import express from 'express'
import multer from "multer";
import path from 'path'
import { activateMovie, addMovie, deactivateMovie,  deleteMovie, editMovie, getActiveMovies, getAllMovies, getSingleMovie } from '../controllers/movie.controller.js';
import { addShows, deleteShow, editShow, getShowsByDate, getShowsSingleMovie } from '../controllers/show.controller.js';
import { expireBooking, getBookingsShow, getTodaysBookingCount } from '../controllers/booking.controller.js';
import { getTotalUsers } from '../controllers/user.controller.js';

const router = express.Router();

// multer package is for storing the file that we get from the frontend to the server
// defining the storage that is where to store the image
const storage = multer.diskStorage({
    destination:function (req,res,cb){
        cb(null,'public/poster-images');
    },
    filename:function (req,file,cb){
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
// creating an object of the multer with the storage definition
const upload=multer({storage: storage})

router.post("/addMovie",upload.single('poster_image'),addMovie); // api for adding a new movie

router.put('/editMovie/:id',upload.single('poster_image'),editMovie); // api for editing an existing movie

router.delete('/deleteMovie/:id',deleteMovie); // api for deleting a movie

router.get('/getAllMovies',getAllMovies); // api for getting all movies from the databse

router.get('/getSingleMovie/:id',getSingleMovie); // api for getting a single movie details with the movie ID

router.get('/getActiveMovies',getActiveMovies); //api to get only active movies

router.get('/deactivateMovie/:id',deactivateMovie) // api for deactivating the movie (setting is active to false)

router.get('/activateMovie/:id',activateMovie) // api for activating the movie (setting is active to true)

router.post('/addShows',addShows); // api for adding shows

router.delete('/deleteShow/:id',deleteShow); // api for deleting the show

router.put('/editShow/:id',editShow); // api for editing the show 

router.get('/getShowsSingleMovie/:id',getShowsSingleMovie) // api for getting the shows of a particular movie by checking the movie id

router.post('/getShowsByDate',getShowsByDate) // api for getting shows by the date

router.get('/getBookingsShow/:id',getBookingsShow) // api for getting the bookings of a particular show

router.get('/getTodaysBookingCount',getTodaysBookingCount) // api for getting the count of tickets sold today

router.put('/expireBooking/:id',expireBooking) // api for expirebooking by the scanner

router.get('/getTotalUsers',getTotalUsers)

export default router;