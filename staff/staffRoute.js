const pool = require('../db/connect')
const express = require('express')
const staffController = require('./staffCont')
const {verifyTeacherToken, verifyAdminToken} = require("../util/verification")
const router = express.Router()



//  get the entire staff data
router.get('/staff', verifyAdminToken, staffController.fechAllStaffs)

// inserting new staff 
router.post("/staff", staffController.insertNewStaff)
// teachers login  
router.post("/staff/teacher/login", staffController.teacherLogin)
// teachers login  
router.post("/staff/admin/login", staffController.adminLogin)
// deleting a staff with email
router.post("/staff/delete", staffController.deletebyEmail)

//  getting  a single staff data using email
router.post("/staff/email", staffController.getStaffByAdmission)

// updating staff record with email
router.post("/staff/update", staffController.updateStaffByEmail)

module.exports = router
