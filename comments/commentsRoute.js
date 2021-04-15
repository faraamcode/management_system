const pool = require('../db/connect')
const express = require('express')
const commentsController = require('./commentsCont')
const router = express.Router()
const {verifyTeacherToken, verifyAdminToken} =require("../util/verification")

// inserting new comment into the table
router.post('/comment', commentsController.insertNewComment, commentsController.UpdateComment)
// getting a student comment using admission, term, session
router.get('/comment/student', commentsController.fetchByMultiple)
// updating a student comment using admission, term , session
router.post('/comment/update', verifyTeacherToken, commentsController.UpdateComment)
//  deleting a student comment using admission, term, session
router.post('/comment/delete', verifyAdminToken, commentsController.DeleteComment)
module.exports = router