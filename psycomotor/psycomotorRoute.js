const pool = require('../db/connect')
const express = require('express')
const psycomotorController = require('./psycomotorCont')
const router = express.Router()

//  get all the psycomotor 
router.get('/psycomotor', psycomotorController.fetchAllpsycomotor)

// inserting new psycomotor
router.post("/psycomotor",psycomotorController.insertNewPsycomotor, psycomotorController.UpdatePsycomotor)
// delete new psycomotor using admission, term, session, sycomotor name
router.post("/psycomotor/delete", psycomotorController.DeletePsycomotor)

//  getting   sycomotors using admission, term, session
router.post("/psycomotor/term", psycomotorController.fetchByMultiple)

// updating a single psycomotore record using admission, term, session and sycomotor name
router.post("/psycomotor/update", psycomotorController.UpdatePsycomotor)

module.exports = router
