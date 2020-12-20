//import mongoose
const mongoose = require('mongoose')

//import database url from env
const db = process.env.MONGODB

//connect to the database
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('db connected')
}).catch(() => {
    console.log('db not connected')
})