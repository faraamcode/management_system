const express = require('express')
const classController = require('../controller/classCont')
const { restart } = require('nodemon')
const router = express.Router()
const pool = require('../db/connect')
const { route } = require('./studentRoute')
// reading of class table
router.get('/class', classController.getClass)
// creating a new class on the table
router.post('/class', classController.postClass)
//  updating class table by id
router.post('/class/:id', classController.updateById)
//  selcting class by id
router.get('/class/:id', classController.getClassById)
// deleting class by id

router.get('/class/delete/:id', classController.deleteClassById)
module.exports = router
