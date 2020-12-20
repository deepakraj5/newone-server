const express = require('express')
const Teacher = require('../models/teacher.model')
const multer = require('multer')
const auth = require('../middleware/auth')

const upload = multer({
    fileSize: 1000000
})

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

route.post('/newTeacher', upload.single('cv'), async (req, res) => {
    try {
        const teacher = new Teacher(req.body)
        teacher.cv = req.file.buffer
        await teacher.save()

        return res.send({ message: 'Teacher Created' })
    } catch (e) {
        res.status(400).send({
            error: errorFormatter(e.message)
        })
    }
})

route.get('/profile', auth, async (req, res) => {
    const user = req.user

    res.send({ user })
})

module.exports = route