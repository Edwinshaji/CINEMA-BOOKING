import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./css/Bookings.css";
import { UserContext } from "../../../context/userContext";

const Bookings = () => {
  const { user } = useContext(UserContext);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [expiredBookings, setExpiredBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getTickets/${user._id}`
        );

        const bookings = res.data;

        setConfirmedBookings(
          bookings.filter((b) => b.status === "confirmed").sort((a, b) => new Date(a.show.date) - new Date(b.show.date))
        );
        setCanceledBookings(
          bookings.filter((b) => b.status === "canceled").sort((a, b) => new Date(a.show.date) - new Date(b.show.date))
        );
        setExpiredBookings(
          bookings.filter((b) => b.status === "expired").sort((a, b) => new Date(a.show.date) - new Date(b.show.date))
        );
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [user]);


  const handleCancelBooking = async (e, booking) => {
    e.stopPropagation();
    const bookingId = booking._id;
    try {
      const response = await axios.put(`http://localhost:5000/api/user/cancelTicket/${user._id}/${bookingId}`,{booking});
      alert(response.data.message);
      window.location.reload(); // reload to refresh updated status
    } catch (error) {
      console.error("Cancel booking failed", error);
    }
  };

  const handleShowPopup = (booking) => {
    if (booking.status === "expired") return; // Prevent popup for expired
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  const renderBookingCard = (booking) => {
    const isExpired = booking.status === "expired";
    const isCanceled = booking.status === "canceled";
    const isConfirmed = booking.status === "confirmed";

    return (
      <div
        key={booking._id}
        className={`booking-card ${isExpired ? "expired" : ""} ${isCanceled ? "canceled" : ""}`}
        onClick={() => handleShowPopup(booking)}
        style={{ cursor: isExpired ? "default" : "pointer" }}
      >
        <div className="booking-info">
          <h3>{booking.movie.title}</h3>
          <p><strong>Date:</strong> {new Date(booking.show.date).toISOString().split('T')[0]}</p>
          <p><strong>Time:</strong> {booking.show.time}</p>
          <p><strong>Seats:</strong> {booking.selectedSeats.join(", ")}</p>
          {isConfirmed && (
            <button
              className="cancel-btn"
              onClick={(e) => handleCancelBooking(e, booking)}
            >
              Cancel Booking
            </button>
          )}
          {isCanceled && <p className="status canceled">Canceled</p>}
          {isExpired && <p className="status expired">Expired</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="bookings-page">
      <div className="booking-banner">
        <h1 className="page-title float-title">Your Tickets</h1>
      </div>

      <div className="bookings-section">
        <div className="bookings-list">
          {confirmedBookings.length > 0 ? (
            confirmedBookings.map((b) => renderBookingCard(b))
          ) : (
            <p>No Tickets Available</p>
          )}
        </div>
      </div>

      {canceledBookings.length > 0 && (
        <div className="bookings-section">
          <h2>🚫 Canceled Tickets</h2>
          <div className="bookings-list">
            {canceledBookings.length > 0 ? (
              canceledBookings.map((b) => renderBookingCard(b))
            ) : (
              <p>No canceled bookings.</p>
            )}
          </div>
        </div>
      )}

      {expiredBookings.length > 0 && (
        <div className="bookings-section">
          <h2>⌛ Expired Tickets</h2>
          <div className="bookings-list">
            {expiredBookings.length > 0 ? (
              expiredBookings.map((b) => renderBookingCard(b))
            ) : (
              <p>No expired bookings.</p>
            )}
          </div>
        </div>
      )}

      {/* Popup Modal for Booking Details */}
      {showPopup && selectedBooking && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleClosePopup}>
              &times;
            </button>
            <img
              src={`http://localhost:5000/poster-images/${selectedBooking.movie.posterUrl}`}
              alt={selectedBooking.movie.title}
              className="popup-poster"
            />
            <div className="popup-info">
              <h2 style={{ color: "#333", marginBottom: "1rem" }}>{selectedBooking.movie.title}</h2>
              <p><strong>Date:</strong> {new Date(selectedBooking.show.date).toISOString().split('T')[0]}</p>
              <p><strong>Time:</strong> {selectedBooking.show.time}</p>
              <p><strong>Seats:</strong> {selectedBooking.selectedSeats.join(", ")}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
