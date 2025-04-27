import React from 'react'
import './TicketPopup.css'

const TicketPopup = ({ poster, movie, date, time, seats, status, totalAmount, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={`http://localhost:5000/poster-images/${poster}`}
                    alt={movie}
                    className="popup-poster"
                />
                <div className="popup-info">
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>{movie}</h2>
                    <p><strong>Date:</strong>{date}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Seats:</strong> {seats}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default TicketPopup
