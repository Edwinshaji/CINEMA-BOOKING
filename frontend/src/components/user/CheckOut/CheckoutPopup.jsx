import React, { useContext } from 'react';
import './CheckoutPopup.css';
import { UserContext } from '../../../../context/userContext';
import { toast } from 'react-toastify';

const CheckoutPopup = ({ movie, selectedDate, selectedTime, selectedSeats, totalAmount, onClose,onBookingComplete}) => {

    const {user} = useContext(UserContext);

    if (!movie || !selectedDate || !selectedTime || selectedSeats.length === 0) return null;

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: 'rzp_test_Z1hEUMT3BVScDc' ,
            amount: totalAmount *100,
            currency: "INR",
            name: movie.title,
            description: "Movie Ticket Booking",
            image: `http://localhost:5000/poster-images/${movie.posterUrl}`,
            handler: function (response) {
                toast.success("Payment Successful!")
                onBookingComplete()
                // TODO: Call your backend API to confirm booking and save transaction
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="popup-content">
                    <img src={`http://localhost:5000/poster-images/${movie.posterUrl}`} alt={movie.title} className="movie-poster" />
                    <h2>{movie.title}</h2>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
                    <p><strong>Total:</strong> ₹{totalAmount}</p>
                    <button className="confirm-btn" onClick={handlePayment}>Pay & Confirm Booking</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPopup;
