const pool = require('../db/connect')
const express = require('express')
const staffController = require('./staffCont')
const router = express.Router()

const verifyToken = (req, res, next) => {
   let token = req.body.token || req.header.Authorization || req.header['x-auth-token'] || req.header.token
   if(!token) return res.status(401).send('unauthorized!!!')
   token = token.split(' ')[1]
   req.token = token 
   next()
}

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
