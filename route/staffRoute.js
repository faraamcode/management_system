const pool = require('../db/connect')
const express = require('express')
const staffController = require('../controller/staffCont')
const router = express.Router()

//  get the entire staff data
router.get('/staff',staffController.fechAllStaffs)

// inserting new staff 
router.post("/staff", staffController.insertNewStaff)
// deleting a staff with email
router.post("/staff/delete", staffController.deletebyEmail)

//  getting  a single staff data using email
router.post("/staff/email", staffController.getStaffByAdmission)

// updating staff record with email
router.post("/staff/update", staffController.updateStaffByEmail)

module.exports = router
