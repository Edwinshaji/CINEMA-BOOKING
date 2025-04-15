import Show from "../models/show.model.js";

export const addShows = async (req, res) => {
    try {
        const { movieId, dates, showTimes } = req.body;

        const showsToInsert = [];
        
        // looping the dates array and inside that loop the showTime array by the combination of this we can create the multiple shows
        dates.forEach((date) => {
            showTimes.forEach((time) => {
                showsToInsert.push({
                    movie: movieId,
                    date: new Date(date).toLocaleDateString("en-GB"),
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