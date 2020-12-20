//import express
const express = require('express')

//import env lib and config
require('dotenv').config()

//import mongoose db connection
require('./db/mongoose')

//import cors lib
const cors = require('cors')

//import teacher route
const teacherRoute = require('./routers/teacher.route')

//import login route
const teacherLoginRoute = require('./auth/teacher.login')

const app = express()

//init port from env file
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use(teacherRoute)
app.use(teacherLoginRoute)

//make app run on port
app.listen(port, () => {
    console.log(`server up on running in ${port}`)
})