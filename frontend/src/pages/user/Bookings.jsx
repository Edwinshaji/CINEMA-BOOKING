import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./css/Bookings.css";
import { UserContext } from "../../../context/userContext";
import TicketPopup from "../../components/user/TicketPopup/TicketPopup";
import { toast } from "react-toastify";

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
      const response = await axios.put(`http://localhost:5000/api/user/cancelTicket/${user._id}/${bookingId}`, { booking });
      toast.success(response.data.message);

      setTimeout(()=>{
        window.location.reload(); // reload to refresh updated status
      },1000)
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
        <TicketPopup
          poster={selectedBooking.movie.posterUrl}
          movie={selectedBooking.movie.title}
          date={new Date(selectedBooking.show.date).toISOString().split('T')[0]}
          time={selectedBooking.show.time}
          seats={selectedBooking.selectedSeats.join(", ")}
          status={selectedBooking.status}
          totalAmount={selectedBooking.totalAmount}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Bookings;
