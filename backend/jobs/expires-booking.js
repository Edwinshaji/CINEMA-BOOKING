import Movie from '../models/movie.model.js';
import Show from '../models/show.model.js';
import Booking from '../models/booking.model.js';

export const expiresBookings =  async () => {
    const now = new Date();
    try {
        const bookings = await Booking.find({ status: 'confirmed' })
            .populate({
                path: 'show',
                select:'date time'
            })
            .populate({
                path:'movie',
                select:'duration'
            })

        for (const booking of bookings) {
            const show = booking.show;
            const movie = booking.movie;

            const showDateTime = new Date(show.date);
            const [time, period] = show.time.split(' '); // e.g., "2:00 PM"
            const [hours, minutes] = time.split(':').map(Number);

            let adjustedHour = hours;
            if (period === 'PM' && hours !== 12) adjustedHour += 12;
            if (period === 'AM' && hours === 12) adjustedHour = 0;

            showDateTime.setHours(adjustedHour);
            showDateTime.setMinutes(minutes);
            showDateTime.setSeconds(0);

            const showEndTime = new Date(showDateTime.getTime() + movie.duration * 60000);

            if (now > showEndTime) {
                booking.status = 'expired';
                await booking.save();
            }

        }
    } catch (error) {
        console.log(error)
    }
};