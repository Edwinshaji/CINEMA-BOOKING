import React from 'react';
import './CheckoutPopup.css';

const CheckoutPopup = ({ movie, selectedDate, selectedTime, selectedSeats, totalAmount, onClose, onConfirm }) => {
    if (!movie || !selectedDate || !selectedTime || selectedSeats.length === 0) return null;

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
                    <button className="confirm-btn" onClick={onConfirm}>Confirm Booking</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPopup;
