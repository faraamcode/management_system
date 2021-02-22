const pool = require('../db/connect')
const express = require('express')
const router = express.Router()
const staffController = require('../controller/staffCont')

//  get the entire staff data
router.get('/staff')
// deleting a staff with email

//  getting  a single staff data using email

// updating staff record with email

module.exports = router
