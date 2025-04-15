import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Show",
        required:true
    },
    selectedSeats:{
        type:[String],
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["confirmed","cancelled","expired"],
        default:"confirmed"
    }
});

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;