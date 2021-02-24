const pool = require('../db/connect')
const express = require('express')
const affectiveController = require('../controller/affectiveCont')
const router = express.Router()

//  get the entire affective domain
router.get('/affective', affectiveController.fetchAllAffective)

// inserting new affective domain 
router.post("/affective", affectiveController.insertNewAffective)
// deleting a staff with email
router.post("/affective/delete", affectiveController.DeleteAffective)

//  getting  psycomotor using admission, term, session
router.post("/affective/term", affectiveController.fetchByMul)

// updating psycomotor using admission, term, session
router.post("/affective/update", affectiveController.UpdateAffective)

module.exports = router
