const pool = require('../db/connect')
const express = require('express')
const attendanceController = require('./attendanceCont')
const router = express.Router()
const {verifyTeacherToken, verifyAdminToken} = require("../util/verification")

// inserting new attendance into the table
router.post('/attendance', verifyTeacherToken, attendanceController.insertNewAttendance)
// getting a student attendance using admission, term, session
router.get('/attendance/student', attendanceController.fetchByMultiple)
// updating a student attendance using admission, term , session
router.post('/attendance/update', verifyTeacherToken, attendanceController.UpdateAttendance)
//  deleting a student attendance using admission, term, session
router.post('/attendance/delete', verifyAdminToken, attendanceController.DeleteAttendance)
module.exports = router