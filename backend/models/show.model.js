import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    screen: {
        type: String, // if you have multiple screens
        default: "Screen 1",
    },
    totalSeats:{
        type:Number,
        default:100
    },
    availableSeats: {
        type: Array, // you can later predefine this based on theatre
        default: [],
    },
})

const Show = mongoose.model("Show", ShowSchema);
export default Show;