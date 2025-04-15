import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected")
    } catch (error) {
        console.error(`Error : $(error.message)`)
        process.exit(1) // 1 code means exit with faliure ,  0 means success 
    }
}