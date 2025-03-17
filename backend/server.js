import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudenary.js'
import adminRouter from './routes/admin.route.js'


// App config

const app = express()
const port = process.env.PORT || 4000
connectDB()
dotenv.config(); // Load environment variables
connectCloudinary()

// App middlewares

app.use(express.json())
app.use(cors())

// App endpoints

app.use('/api/admin', adminRouter)

app.get('/', (req, res) =>{
    res.send("App is running")
})

app.listen(port, ()=> console.log("server started at", port))