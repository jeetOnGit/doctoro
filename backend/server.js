import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// App config

const app = express()
const port = process.env.PORT || 4000

// App middlewares

app.use(express.json())
app.use(cors())

// App endpoints

app.get('/', (req, res) =>{
    res.send("App is running")
})

app.listen(port, ()=> console.log("server started at", port))