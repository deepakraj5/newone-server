const express = require('express')
const { v4 } = require('uuid')
const auth = require('../middleware/auth')
const Classes = require('../models/classes')
const Student = require('../models/student.model')
const studentAuth = require('../middleware/student.auth')

const route = express.Router()

route.post('/teacher/newclass', auth, async (req, res) => {
    try {
        const newClass = new Classes(req.body)
        newClass.classId = v4()
        newClass.teacherName = req.user.name
        await newClass.save()

        const _class = {
            classId: newClass.classId,
            className: newClass.className
        }

        req.user.classes = req.user.classes.concat({ _class })
        await req.user.save({ validateBeforeSave: false })

        res.send({ message: `Join class using the Id : ${newClass.classId}`})
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.post('/student/joinclass', studentAuth, async (req, res) => {
    try {
        const _classes = req.user.classes
        const verify = _classes.filter((single) => {
            return single._class._class_ID === req.body.classId
        })

        console.log(verify.length)

        if(verify.length > 0) {
            return res.status(400).send({ error: 'you are already in the class' })
        } else {
            let joinClass = await Classes.findOne({ classId: req.body.classId })

            const _class = {
                _class_ID: joinClass.classId,
                className: joinClass.className,
                teacherName: joinClass.teacherName
            }

            req.user.classes = req.user.classes.concat({ _class })
            await req.user.save({ validateBeforeSave: false })

            const student = {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
            joinClass.students = joinClass.students.concat({ student })
            await joinClass.save()

            res.send({ message: 'joined Class successfully' })
        }
        
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: 'something went wrong' })
    }
})

module.exports = route