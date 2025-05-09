import Show from "../models/show.model.js";

export const addShows = async (req, res) => {
    try {
        const { movieId, dates, times } = req.body;

        const showsToInsert = [];
        
        // looping the dates array and inside that loop the showTime array by the combination of this we can create the multiple shows
        dates.forEach((date) => {
            times.forEach((time) => {
                showsToInsert.push({
                    movie: movieId,
                    date: new Date(date).toISOString().split('T')[0],
                    time: time
                })
            })
        })
        // insert the array of objects created into the database
        const insertedShows = await Show.insertMany(showsToInsert)

        return res.status(201).json({ message: "Shows added successfuly", shows: insertedShows })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const editShow = async(req,res) =>{
    try {
        // editing the show by accessing the show id
        let showId = req.params.id;
        let updatedShow = await Show.findByIdAndUpdate(showId,req.body);

        if(updatedShow){
            return res.status(200).json({message:"Show updated",show:updatedShow})
        }else{
            return res.status(400).json({status:false,message:"Show doesn't updated"})
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const deleteShow = async (req, res) => {
    try {
        // deleting the show by accessing the show id
        let showId = req.params.id;

        let deleteShow = await Show.findByIdAndDelete(showId);
        if (deleteShow) {
            return res.status(200).json({ status: true, message: "Show deleted" })
        } else {
            return res.status(400).json({ status: false, message: "Show doesn't deleted" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getShowsSingleMovie = async (req,res)=>{
    try {
        const movieId=req.params.id;
        const shows = await Show.find({movie:movieId})
        return res.status(200).json(shows)
    } catch (error) {
        return res.status(500).json({status:false,message:"Server Error"})
    }
}

export const getShowsByDate = async(req,res)=>{
    try {
        const date = req.body.date;
        let shows = await Show.find({date:date})
        if(shows){
           return res.status(200).json(shows)
        }else{
            return res.status(404).json({status:false,message:"shows not found"})
        }
    } catch (error) {
        return res.status(500).json({status:false,message:"Server Error"})
    }
}