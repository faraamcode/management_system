const express = require('express')
const classController = require('./classCont')
const { restart } = require('nodemon')
const router = express.Router()
const pool = require('../db/connect')
const { route } = require('../student/studentRoute')
const {verifyAdminToken, verifyTeacherToken} = require("../util/verification")
// reading of class table
router.get('/class', classController.getClass)
// creating a new class on the table
router.post('/class', verifyAdminToken, classController.postClass)
//  updating class table by id
router.post('/class/:id', verifyAdminToken, classController.updateById)
//  selcting class by id
router.get('/class/:id', classController.getClassById)
// deleting class by id

router.get('/class/delete/:id', verifyAdminToken, classController.deleteClassById)
module.exports = router