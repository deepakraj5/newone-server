const express = require('express')
const auth = require('../middleware/auth')
const Classes = require('../models/classes')

const route = express.Router()

route.post('/teacher/newclass', auth, async (req, res) => {
    try {
        const newClass = new Classes(req.body)
        newClass.teacherName = req.user.name
        await newClass.save()

        res.send({ message: `Join class using the Id : ${newClass.classId}`})
    } catch (e) {
        res.status(500).send({ error: 'Something went wrong' })
    }
})

module.exports = route