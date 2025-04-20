import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import UserRouter from './routes/user.route.js';
import AdminRouter from './routes/admin.route.js'

const app = express();
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use("/api/user", UserRouter)
app.use("/api/admin", AdminRouter)

app.listen(5000, () => {
    connectDB();
    console.log("Server Started at PORT 5000");
})