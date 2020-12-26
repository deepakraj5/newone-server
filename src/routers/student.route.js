const express = require('express')
const Student = require('../models/student.model')
const auth = require('../middleware/student.auth')

const route = express.Router()

const errorFormatter = (e) => {
    let errors = {}

    const allErrors = e.substring(e.indexOf(':') + 1).trim()
    const errorArray = allErrors.split(',').map(err => err.trim())
    errorArray.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim())
        errors[key] = value
    })
    return errors
}

route.post('/student/newstudent', async (req, res) => {
    try {
        const student = new Student(req.body.student)
        await student.save()

        res.send({ message: 'Student created' })
    } catch (e) {
        res.status(400).send({ error: errorFormatter(e.message) })
    }
})

route.get('/student/profile', auth, async (req, res) => {
    const user = req.user
    res.send({ user })
})

module.exports = route