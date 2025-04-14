import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    language:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String
    },
    isActive:{
        type:Boolean
    }
}, {
    timestamps: true //createdAt , updatedAt
})

const Movie = mongoose.model('movie', MovieSchema)

export default Movie;