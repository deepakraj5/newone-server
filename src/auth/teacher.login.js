const express = require('express')
const Teacher = require('../models/teacher.model')
const bcrypt = require('bcryptjs')

const route = express.Router()

route.post('/teacher/signin', async (req, res) => {
    try {
        const user = await Teacher.findOne({ username: req.body.username }, { username: 1, password: 1, tokens: 1 })

        if(!user) {
            throw new Error()
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isMatch) {
            throw new Error()
        }

        const token = await user.generateAuthToken()

        await user.save({ validateBeforeSave: false})   //{ validateBeforeSave: false }

        res.send({ token })
        
    } catch (e) {
        res.status(401).send({ error: 'Wrong Credentails' })
    }
})

module.exports = route