import React, { useContext, useEffect, useState } from "react";
import "./BookShow.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";
import CheckoutPopup from "../CheckOut/CheckoutPopup";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import { toast } from "react-toastify";


const BookShow = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const [movieId, setMovieId] = useState('');
    const [movie, setMovie] = useState({})
    const [shows, setShows] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [totalAmount, setTotalamount] = useState(0);

    const [showPopup, setShowPopup] = useState(false);

    const [selectedShow, setSelectedShow] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [unavailableSeats, setUnavailableSeats] = useState([]);

    const rows = "ABCDEFGHIJ".split("");
    const seatsPerRow = 10;

    //toggle seats is for selecting the seats , deselecting seats
    const toggleSeat = (seatId) => {
        if (unavailableSeats.includes(seatId)) return;
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    // after selecting the seats when we press checkout button this function is called
    const handleCheckOut = async () => {
        await axios.post('http://localhost:5000/api/user/bookTicket', { userId: user._id, movieId: movieId, showId: selectedShow._id, selectedSeats: selectedSeats, totalAmount: totalAmount }, { withCredentials: true })
            .then((response) => {
                toast.success(response.data.message)
                setShowPopup(false)
            })
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // when we press book tickets from movie page we want to get the id of movie is selected for that we 
    //use location sent properties to different components
    useEffect(() => {
        setMovieId(location.state.movieId)
    }, [location.state])

    // after we gets the movieId we want to list all the shows associated with that movie so 
    // use api calls for get that data from db and get stored in state
    useEffect(() => {
        if (!movieId) return;
        // get all shows    
        axios.get('http://localhost:5000/api/user/getShowsSingleMovie/' + movieId)
            .then((response) => {
                setShows(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        // get details of that movie
        axios.get('http://localhost:5000/api/user/getSingleMovie/' + movieId)
            .then((response) => {
                setMovie(response.data)
            })
    }, [movieId])

    // for users better usablity we fetch all dates of shows and get sort them in ascending order and 
    // stored in dates state
    useEffect(() => {
        const uniqueDates = [];
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().split('T')[0]
        // if the shows include same dates multiple it filter it into a uniqueDate[]
        shows.forEach((show) => {
            const cleanDate = new Date(show.date).toISOString().split('T')[0];
            if (!uniqueDates.includes(cleanDate) && cleanDate >= currentDateString) {
                uniqueDates.push(cleanDate)
            }
        })

        // sorting of dates happens and convert the date into date-month-year format
        const sortedDates = Array.from(uniqueDates)
            .sort((a, b) => new Date(a) - new Date(b))
            .map((dateStr) => {
                const dateObj = new Date(dateStr);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                return `${day}-${month}-${year}`; // Format: d-m-y
            });

        // sorted dates is stored to dates state
        setDates(sortedDates);
    }, [shows])

    useEffect(() => {
        // default to select the nearest date automatically when the page renders
        if (dates.length > 0) {
            // selectedDate is get assigned by the first item in the dates[] state
            if (!selectedDate) setSelectedDate(dates[0]);
        }
    }, [dates]);

    useEffect(() => {
        function formatToDMY(dateStr) {
            const d = new Date(dateStr);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        }

        const convertTo24Hour = (time) => {
            const [hour, minutePart] = time.split(':');
            const [minute, period] = minutePart.split(' ');
            let hour24 = parseInt(hour, 10);

            if (period === 'PM' && hour24 !== 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;

            const paddedHour = String(hour24).padStart(2, '0');
            const paddedMinute = String(minute).padStart(2, '0');

            return `${paddedHour}:${paddedMinute}`;
        };

        if (selectedDate && shows.length > 0) {
            const timesForDate = shows
                .filter(show => formatToDMY(show.date) === selectedDate)
                .map(show => show.time);

            const currentDateTime = new Date();
            const currentDateFormatted = formatToDMY(currentDateTime);

            const updatedTimes = Array.from(new Set(timesForDate))
                .sort((a, b) => {
                    const timeA = new Date(`1970-01-01T${convertTo24Hour(a)}:00`);
                    const timeB = new Date(`1970-01-01T${convertTo24Hour(b)}:00`);
                    return timeA - timeB;
                })
                .filter((time) => {
                    if (selectedDate !== currentDateFormatted) {
                        // Future dates - keep all times
                        return true;
                    } else {
                        // Today's date - filter by current time
                        const showTime = new Date(`1970-01-01T${convertTo24Hour(time)}:00`);
                        const nowTime = new Date(`1970-01-01T${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:00`);
                        return showTime > nowTime;
                    }
                });

            if (updatedTimes.length === 0) {
                // No future shows for this date, so remove selected date
                setSelectedDate(null);
                setTimes([]);
                setSelectedTime(null);
            } else {
                setTimes(updatedTimes);
                setSelectedTime((prev) =>
                    updatedTimes.includes(prev) ? prev : updatedTimes[0] || null
                );
            }
        }
    }, [selectedDate, shows]);// Re-run when selectedDate or shows change

    useEffect(() => {
        function formatToDMY(dateStr) {
            const d = new Date(dateStr);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        }

        if (selectedDate && selectedTime && shows.length > 0) {
            // Find the show that matches both selected date and time
            const show = shows.find(
                (show) => formatToDMY(show.date) === selectedDate && show.time === selectedTime
            );

            if (show) {
                setSelectedShow(show); // Set the selected show
                setUnavailableSeats(show.bookedSeats)
            } else {
                setSelectedShow(null);
                setUnavailableSeats([]);
            }
        }
    }, [selectedDate, selectedTime, shows]);

    useEffect(() => {
        setTotalamount(selectedSeats.length * 150)
    }, [handleCheckOut])
    return (
        <div className="booking-page">

            {/* 🎬 Movie Title */}


            <div className="selectors">
                <div className="date-picker">
                    <h3>Select Date</h3>
                    <div className="options">
                        {dates.map((date) => (
                            <button
                                key={date}
                                className={selectedDate === date ? "selected" : ""}
                                onClick={() => setSelectedDate(date)}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="movie-title">
                    <h2>{movie.title}</h2>
                </div>

                <div className="time-picker">
                    <h3>Select Time</h3>
                    <div className="options">
                        {times.map((time) => (
                            <button
                                key={time}
                                className={selectedTime === time ? "selected" : ""}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="screen">Screen This Way</div>

            {/* 🪑 Seats with Row Labels */}
            <div className="seats-wrapper">
                {rows.map((row) => (
                    <div key={row} className="seat-row">
                        <div className="row-label">{row}</div>
                        {Array.from({ length: seatsPerRow }, (_, index) => {
                            const seatId = `${row}${index + 1}`;
                            const isUnavailable = unavailableSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);
                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${isUnavailable ? "unavailable" : isSelected ? "selected" : ""
                                        }`}
                                    onClick={() => toggleSeat(seatId)}
                                >
                                    {index + 1}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <button className="checkout-btn" disabled={selectedSeats.length === 0 || selectedDate === null || selectedTime === null} onClick={() => setShowPopup(true)}>
                Proceed to Book ({selectedSeats.length} seats)
            </button>
            {
                showPopup && (
                    <ProtectedRoute><CheckoutPopup
                        movie={movie}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedSeats={selectedSeats}
                        totalAmount={totalAmount}
                        onClose={() => setShowPopup(false)}
                        onBookingComplete={handleCheckOut}
                    /></ProtectedRoute>
                )
            }
        </div>
    );
};


export default BookShow;
