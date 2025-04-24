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


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (date) => {
        const formatted = formatDate(date);

        if (selectedDates.includes(formatted)) {
            setSelectedDates(selectedDates.filter(d => d !== formatted));
        } else {
            setSelectedDates([...selectedDates, formatted]);
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
        console.log(selectedDates)

        const data = {
            movieId: selectedMovie.value,
            dates: selectedDates.map(d => new Date(d).toISOString().split('T')[0]),
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
                minDate={new Date()}
                highlightDates={selectedDates.map(d => new Date(d))}
                dayClassName={date => {
                    const formatted = formatDate(date);
                    return selectedDates.includes(formatted)
                        ? 'highlighted-day'
                        : undefined;
                }}
            />

            {/* Debugging: show selected */}
            <div style={{ marginTop: '1rem' }}>
                <strong>Selected Dates:</strong>
                <ul>
                    {selectedDates.map((d, idx) => <li key={idx}>{d}</li>)}
                </ul>
            </div>

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
