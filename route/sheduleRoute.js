const pool = require('../db/connect')
const express = require('express')
const scheduleController = require('../controller/sheduleCont')
const router = express.Router()

// inserting new attendance into the table
router.post('/schedule', scheduleController.insertNewSchedule)
// getting a  schedule using admission, term, session
router.get('/schedule', scheduleController.fetchByMultiple)
// updating a schedule using admission, term , session
router.post('/schedule/update', scheduleController.UpdateSchedule)
//  deleting a schedule using admission, term, session
router.post('/schedule/delete', scheduleController.DeleteSchedule)
module.exports = router