const jwt = require('jsonwebtoken')
const Teacher = require('../models/teacher.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Teacher.findOne({ _id: verify._id, 'tokens.token': token }, {
            password: 0, tokens: 0, cv: 0
        })

        if(!user) {
            throw new Error()
        }

        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: 'Unauthenticated' })
    }
}

module.exports = auth