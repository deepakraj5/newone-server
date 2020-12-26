const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    classId: {
        type: String
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
    },
    students: [{
        student: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            email: {
                type: String
            }
        }
    }]
})

const Classes = mongoose.model('Classes', classSchema)

module.exports = Classes