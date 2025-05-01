import React from 'react';
import './TicketPopup.css';
import logo from '../../../assets/logo.png'

const TicketPopup = ({ poster, movie, date, time, seats, status, totalAmount, QRCodeImg, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup custom-ticket">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>

                <img
                    src={`http://localhost:5000/poster-images/${poster}`}
                    alt={movie}
                    className="ticket-poster"
                />

                <h2 className="ticket-movie-title">{movie}</h2>
                <p className={`ticket-status ${status}`}>{status.toUpperCase()}</p>

                <div className="ticket-body">
                    <div className="ticket-info-left">
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {time}</p>
                        <p><strong>Seats:</strong> {seats}</p>
                        <p><strong>Paid:</strong> {totalAmount}</p>
                    </div>
                    {QRCodeImg && (
                        <div className="ticket-info-right">
                            <img src={QRCodeImg} alt="QR Code" className="qr-img" />
                        </div>
                    )
                    }
                    {!QRCodeImg && (
                        <div className='ticket-info-right'>
                            <img src={logo} alt='CineGo' className='alt-qr-img'/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketPopup;
