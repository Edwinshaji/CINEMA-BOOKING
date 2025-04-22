import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../addShow/AddShow.css';
import axios from 'axios';

const AddShow = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [showTimeInput, setShowTimeInput] = useState('');
    const [showTimes, setShowTimes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/getAllMovies')
            .then((response) => {
                const options = response.data.map(movie => ({
                    value: movie._id,
                    label: movie.title
                }));
                setMovies(options);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDateChange = (date) => {
        const exists = selectedDates.find(d => d.toDateString() === date.toDateString());
        if (exists) {
            setSelectedDates(selectedDates.filter(d => d.toDateString() !== date.toDateString()));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    const addShowTime = () => {
        if (showTimeInput && !showTimes.includes(showTimeInput)) {
            setShowTimes([...showTimes, showTimeInput]);
            setShowTimeInput('');
        }
    };

    const removeShowTime = (time) => {
        setShowTimes(showTimes.filter(t => t !== time));
    };

    const handleAddShow = async () => {
        if (!selectedMovie || selectedDates.length === 0 || showTimes.length === 0) {
            alert('Please fill in all fields.');
            return;
        }

        const data = {
            movieId: selectedMovie.value,
            dates: selectedDates.map(d => d.toISOString().split('T')[0]),
            times: showTimes,
        };

        await axios.post('http://localhost:5000/api/admin/addShows', data)
            .then((response) => {
                alert(response.data.message);
                setSelectedMovie(null);
                setSelectedDates([]);
                setShowTimes([]);
            })
            .catch((err) => {
                console.log(err)
            })

    };

    return (
        <div className="container">
            <h2>Add Cinema Show</h2>

            <label>Select Movie:</label>
            <Select
                options={movies}
                value={selectedMovie}
                onChange={setSelectedMovie}
                placeholder="Choose a movie"
                className="select-box"
            />

            <label>Select Dates (Click to toggle):</label>
            <DatePicker
                inline
                selected={null}
                onChange={handleDateChange}
                highlightDates={selectedDates}
                minDate={new Date()}
                dayClassName={date =>
                    selectedDates.find(d => d.toDateString() === date.toDateString())
                        ? 'highlighted-day'
                        : undefined
                }
            />

            <label>Add Show Time:</label>
            <div className="time-row">
                <input
                    type="text"
                    value={showTimeInput}
                    onChange={(e) => setShowTimeInput(e.target.value)}
                    className="input time-input"
                />
                <button type="button" className="add-time-button" onClick={addShowTime}>Add</button>
            </div>

            {showTimes.length > 0 && (
                <div className="time-list">
                    {showTimes.map((time, idx) => (
                        <div key={idx} className="time-chip">
                            {time}
                            <button onClick={() => removeShowTime(time)} className="remove-time">&times;</button>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleAddShow} className="button">Add Show</button>
        </div>
    );
};

export default AddShow;
