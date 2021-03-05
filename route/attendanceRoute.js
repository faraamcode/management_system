const pool = require('../db/connect')
const express = require('express')
const attendanceController = require('../controller/attendanceCont')
const router = express.Router()

// inserting new attendance into the table
router.post('/attendance', attendanceController.insertNewAttendance)
// getting a student attendance using admission, term, session
router.get('/attendance/student', attendanceController.fetchByMultiple)
// updating a student attendance using admission, term , session
router.post('/attendance/update', attendanceController.UpdateAttendance)
//  deleting a student attendance using admission, term, session
router.post('/attendance/delete', attendanceController.DeleteAttendance)
module.exports = router