import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../listBookings/ListBookings.css';
import axios from 'axios';
import { backendurl } from '../../../App';

const ListBookings = () => {
    const location = useLocation();
    const [showId, setShowId] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (location.state !== null) {
            setShowId(location.state.showId)
        }
    }, [location.state])

    useEffect(() => {
        if (showId !== null) {

            axios.get(`${backendurl}/api/admin/getBookingsShow/` + showId)
                .then((response) => {
                    setBookings(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [showId])
    return (
        <div className="booking-table-page">
            <h1 className="table-title">Booking Records</h1>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Selected Seats</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{booking.userName}</td>
                            <td>{booking.movieTitle}</td>
                            <td>{new Date(booking.bookingDate).toISOString().split('T')[0]}</td>
                            <td>{new Date(booking.bookingDate).toTimeString().split(' ')[0]}</td>
                            <td>{booking.selectedSeats.join(" , ")}</td>
                            <td>{booking.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                (() => {
                    if (bookings.length === 0) {
                        return (
                            <h2 className='bookings-notfound'>Bookings Not Found</h2>
                        )
                    }
                })
                    ()
            }
        </div>
    );
}

export default ListBookings
