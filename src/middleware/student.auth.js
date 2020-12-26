const jwt = require('jsonwebtoken')
const Student = require('../models/student.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Student.findOne({ _id: verify._id, 'tokens.token': token }, {
            password: 0, tokens: 0
        })

        if(!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (e) {
        res.status(401).send({ error: 'Unauthenticated' })
    }
}

module.exports = auth