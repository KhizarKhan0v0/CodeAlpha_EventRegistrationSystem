const express = require('express')
const Connect_To_DB = require('./db.service')
require('dotenv').config()
const PORT = process.env.PORT
const URL = process.env.ConnectionString
const cors = require('cors')

const app = express()
app.use(express.json())
const cookieParser = require('cookie-parser')

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              //? allow cookies
}));
app.use(cookieParser())
// app.use(express.urlencoded({extended:false}))

Connect_To_DB(URL)
//>>MiddleWares
const userRouter = require('./Routes/user.route')
app.use('/user', userRouter)

const eventRouter = require('./Routes/events.route')
app.use('/event', eventRouter)

const RegistrationRouter = require('./Routes/registrations.routes')
app.use('/reg', RegistrationRouter)

const staticRouter = require('./Routes/staticRouter')
app.use('/', staticRouter)


app.listen(PORT, ()=>{
    console.log(`App Running at http://localhost:${PORT}/`);
})
