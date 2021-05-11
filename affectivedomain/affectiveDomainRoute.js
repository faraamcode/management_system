const pool = require('../db/connect')
const express = require('express')
const affectiveController = require('./affectiveCont')
const router = express.Router()

const {verifyTeacherToken, verifyAdminToken} = require("../util/verification")

//  get the entire affective domain
router.get('/affective', affectiveController.fetchAllAffective)

// inserting new affective domain 
router.post("/affective", affectiveController.insertNewAffective, affectiveController.UpdateAffective)
// deleting a staff with email
router.post("/affective/delete",affectiveController.DeleteAffective)

//  getting  psycomotor using admission, term, session
router.post("/affective/term", affectiveController.fetchByMul)

// updating psycomotor using admission, term, session
router.post("/affective/update",  affectiveController.UpdateAffective)

module.exports = router
