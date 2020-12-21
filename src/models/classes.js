const mongoose = require('mongoose')
const randToken = require('rand-token')

const classSchema = new mongoose.Schema({
    classId: {
        type: String,
        required: true,
        default: randToken.generate(8)
    },
    className: {
        type: String,
        required: true
    },
    teacherName: {
        type: String
    },
    subjectName: {
        type: String,
        required: true
    }
})

const Classes = mongoose.model('Classes', classSchema)

module.exports = Classes