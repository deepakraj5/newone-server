const express = require('express')
const Student = require('../models/student.model')
const bcrypt = require('bcryptjs')

const route = express.Router()

route.post('/student/login', async (req, res) => {
    try {
        const user = await Student.findOne({ username: req.body.username }, { username: 1, password: 1, tokens: 1 })

        if(!user) {
            throw new Error()
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isMatch) {
            throw new Error()
        }

        const token = await user.generateAuthToken()
        user.save()

        res.send({ token })
 
    } catch(e) {
        res.status(400).send({ error: 'wrong credentails' })
    }
})

module.exports = route