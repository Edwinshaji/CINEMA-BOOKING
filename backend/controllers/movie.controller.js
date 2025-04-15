import Movie from "../models/movie.model.js";
import fs from 'fs';
import path from 'path'

export const addMovie = async (req, res) => {
    let { title, description, duration, language } = req.body;

    try {
        // checking if all the fields are submitted by the user 
        if (!title || !description || !duration || !language) {
            return res.status(400).json({ status: false, message: "All fields required" })
        }

        // creating a new movie document 
        const newMovie = new Movie({ title, description, duration, language, posterUrl: req.file.filename, isActive: true })
        await newMovie.save()

        return res.status(201).json({ status: true, message: "Movie added successfuly", newMovie });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const editMovie = async (req, res) => {
    let movieId = req.params.id; // accessing the movie id

    try {
        // finding and updating the movie  
        await Movie.findByIdAndUpdate(movieId, req.body).then(()=>{
            return res.status(200).json({ status: true, message: "Movie updated successfuly" })
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const deleteMovie = async (req, res) => {
    let movieId = req.params.id;

    try {
        // acquires the movie data from the database with the moviId
        let movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        // making the path of the image with the posterUrl
        const posterPath = path.join('C:/Users/Lenovo/Desktop/PROJECTS/CINEMA BOOKING/backend/public/poster-images', movie.posterUrl);
        // using fs unlink the item of the given path
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.log("Failed to delete the image form the server", err)
            } else {
                console.log("Image deleted ", posterPath);
            }
        })

        // deleting the movie form the database
        let deletedMovie = await Movie.findByIdAndDelete(movieId);
        if(deletedMovie){
            return res.status(200).json({ status: true, message: "Movie deleted successfuly" })
        }else{
            return res.status(400).json({ status: true, message: "Movie doesn't deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getAllMovies = async (req, res) => {
    try {
        // fetching all movies from the database
        let movies = await Movie.find();
        return res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server Error" });
    }
}

export const getSingleMovie = async (req, res) => {
    let movieId = req.params.id;

    // fetching the details of a particular movie by the movie id
    try {
        const movie = await Movie.findById(movieId);
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const deactivateMovie = async(req,res)=>{
    try {
        // making the movie deactivate by changing the isActive to false
        let movieId = req.params.id;
        let deactive = await Movie.findByIdAndUpdate(movieId,{isActive:false})

        if(deactive){
            return res.status(200).json({message:"Movie Deactivated"})
        }else{
            return res.status(400).json({message:"Movie Deactivation failed"})
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const activateMovie = async(req,res)=>{
    try {
        // making the movie activate by changing the isActive to true
        let movieId = req.params.id;
        let deactive = await Movie.findByIdAndUpdate(movieId,{isActive:true})

        if(deactive){
            return res.status(200).json({message:"Movie Activated"})
        }else{
            return res.status(400).json({message:"Movie Activation failed"})
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}