const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    }, 
    cv: {
        type: Buffer,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

teacherSchema.path('username').validate(async (value) => {
    const usernameCount = await mongoose.models.Teacher.countDocuments({ username: value })
    return !usernameCount
}, 'Username Already Exists')

teacherSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.Teacher.countDocuments({ email: value })
    return !emailCount
}, 'Email Already Exists')

teacherSchema.path('phoneNumber').validate(async (value) => {
    const phoneNumberCount = await mongoose.models.Teacher.countDocuments({ phoneNumber: value })
    return !phoneNumberCount
}, 'Phone Number Already Exists')

teacherSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    return token
}

teacherSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher