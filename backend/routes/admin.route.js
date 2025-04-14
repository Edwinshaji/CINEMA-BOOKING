import express from 'express'
import multer from "multer";
import path from 'path'
import { addMovie, deleteMovie, editMovie, getAllMovies } from '../controllers/movie.controller.js';

const router = express.Router();

// multer package is for storing the file that we get from the frontend to the server
// defining the storage that is where to store the image
const storage = multer.diskStorage({
    destination:function (req,res,cb){
        cb(null,'backend/public/poster-images');
    },
    filename:function (req,file,cb){
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
// creating an object of the multer with the storage definition
const upload=multer({storage})

router.post("/addMovie",upload.single('poster_image'),addMovie); // api for adding a new movie

router.put('/editMovie/:id',editMovie); // api for editing an existing movie

router.delete('/deleteMovie/:id',deleteMovie); // api for deleting a movie

router.get('/getAllMovies',getAllMovies); // api for getting all movies from the databse

export default router;