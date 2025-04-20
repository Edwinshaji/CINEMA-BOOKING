import Booking from "../models/booking.model.js";

export const bookTicket = async (req, res) => {
    try {
        const { userId, movieId, showId, selectedSeats, totalAmount } = req.body;
        // checking if the show is selected and passed from the frontend
        if (!showId) {
            return res.status(400).json({ status: false, message: "Please select the show" })
        }

        // create a ne document for a booking and save it in the database
        const newBooking = new Booking({ user: userId, movie: movieId, show: showId, selectedSeats, totalAmount });
        await newBooking.save()

        if (newBooking) {
            return res.status(201).json({ message: "Ticket Booked", Booking: newBooking })
        } else {
            return res.status(400).json({ message: "Ticket Booking failed" })
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const cancelTicket = async (req, res) => {
    try {
        const { userId, bookingId } = req.params;
        // check the document with matching of userId and bookingId and update the status to cancelled
        const updated = await Booking.findOneAndUpdate(
            { user: userId, _id: bookingId },
            {
                $set: {
                    status: "cancelled"
                }
            })
            if(updated){
                return res.status(200).json({message:"Ticket cancelled"})
            }else{
                return res.status(404).json({status:false,message:"Ticket cancellation failed"})
            }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getTickets = async(req,res)=>{
    try {
        let userId = req.params.userId;
        let tickets = await Booking.find({user:userId});
        
        if(tickets){
            return res.status(200).json(tickets)
        }else{
            return res.status(404).json({status:false,message:"Tickets not found"})
        }
    } catch (error) {
        return res.status(500).json({status:false,message:"Server Error"})
    }
}