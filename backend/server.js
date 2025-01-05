import express from 'express'
import dotenv from 'dotenv';
import router from './routes/auth.js';
import connectDb from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import path from 'path'
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

dotenv.config();

app.use(cookieParser())
app.use(express.urlencoded({ extended:false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json()) //to parse incoming request with json 



app.use('/api/auth',router)
app.use('/api/message', messageRoute)
app.use('/api/users', userRoute)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

server.listen(PORT, ()=> {
    connectDb()
    console.log(`Server is running at ${PORT}`)
});