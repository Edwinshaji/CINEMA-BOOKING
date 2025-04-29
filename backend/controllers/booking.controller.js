import { stat } from "fs";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Show from "../models/show.model.js";

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
            const isShowUpdated = await Show.updateOne({ _id: showId }, { $addToSet: { bookedSeats: { $each: selectedSeats } } })
            if (isShowUpdated) {
                return res.status(201).json({ message: "Ticket Booked", Booking: newBooking })
            }
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
        const booking = req.body;

        // check the document with matching of userId and bookingId and update the status to cancelled
        const showUpdated = await Show.findByIdAndUpdate(
            { _id: booking.booking.show._id },
            {
                $pull: {
                    bookedSeats: {
                        $in: booking.booking.selectedSeats
                    }
                }
            })
        const updated = await Booking.findOneAndUpdate(
            { user: userId, _id: bookingId },
            {
                $set: {
                    status: "canceled"
                }
            })
        if (updated && showUpdated) {
            return res.status(200).json({ message: "Ticket cancelled" })
        } else {
            return res.status(404).json({ status: false, message: "Ticket cancellation failed" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getTickets = async (req, res) => {
    try {
        let userId = req.params.userId;
        const bookings = await Booking.find({ user: userId })
            .populate({ path: 'show', select: 'date time' })
            .populate({ path: 'movie', select: 'title posterUrl' });

        if (bookings) {
            return res.status(200).json(bookings)
        } else {
            return res.status(404).json({ status: false, message: "Tickets not found" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getBookingsShow = async (req, res) => {
    try {
        let showId = req.params.id;

        let bookings = await Booking.aggregate([
            {
                $match: {
                    show: new mongoose.Types.ObjectId(showId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $lookup: {
                    from: "movies",
                    localField: "movie",
                    foreignField: "_id",
                    as: "movie"
                }
            },
            {
                $unwind: "$movie"
            },
            {
                $lookup: {
                    from: "shows",
                    localField: "show",
                    foreignField: "_id",
                    as: "show"
                }
            },
            {
                $unwind: "$show"
            },
            {
                $project: {
                    _id: 0,
                    bookingDate: 1,
                    selectedSeats: 1,
                    totalAmount: 1,
                    userName: "$user.name",
                    movieTitle: "$movie.title"
                }
            }
        ])
        if (bookings) {
            return res.status(200).json(bookings)
        } else {
            return res.status(404).json({ message: "Bookings not found" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getTodaysBookingCount = async (req, res) => {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));
    try {
        let bookings = await Booking.aggregate([
            {
                $match: { bookingDate: { $gte: start, $lte: end } }
            },
            {
                $group: {
                    _id: null,
                    totalSeats: { $sum: { $size: "$selectedSeats" } }
                }
            }
        ])
        let bookingsCount = bookings[0].totalSeats;
        if (bookings) {
            return res.status(200).json(bookingsCount)
        } else {
            return res.status(404).json({ status: false, message: "Bookings not found" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}