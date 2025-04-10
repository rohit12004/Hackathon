
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const connectToDb = require('./db/db')
const studentRoutes = require('./routes/students.routes')
// const captainRoutes = require('./routes/captain.routes')
// const cookieparser = require('cookie-parser')

connectToDb()
app = express()
app.use(express.json())
app.use(cors({ origin: 'https://hackathon-1-hw3y.onrender.comupdate' }));
// app.use(cookieparser())


app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Hello JS')        
})

app.use('/students',studentRoutes)

app.use('/update',studentRoutes)

app.use('/all',studentRoutes)

app.use('/:registrationNo',studentRoutes)

module.exports = app