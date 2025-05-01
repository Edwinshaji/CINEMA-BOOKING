import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

import { connectDB } from './config/db.js';
import UserRouter from './routes/user.route.js';
import AdminRouter from './routes/admin.route.js';
import PaymentRouter from './routes/payment.route.js';
import { expiresBookings } from './jobs/expires-booking.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/poster-images',express.static(path.join(__dirname,'public/poster-images/')))

app.use("/api/user", UserRouter)
app.use("/api/admin", AdminRouter)
app.use("/api/payment", PaymentRouter)

cron.schedule('* * * * *',()=>{
    expiresBookings();
})

app.listen(5000, () => {
    connectDB();
    console.log("Server Started at PORT 5000");
})