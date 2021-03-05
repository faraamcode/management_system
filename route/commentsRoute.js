const pool = require('../db/connect')
const express = require('express')
const commentsController = require('../controller/commentsCont')
const router = express.Router()

// inserting new comment into the table
router.post('/comment', commentsController.insertNewComment)
// getting a student comment using admission, term, session
router.get('/comment/student', commentsController.fetchByMultiple)
// updating a student comment using admission, term , session
router.post('/comment/update', commentsController.UpdateComment)
//  deleting a student comment using admission, term, session
router.post('/comment/delete', commentsController.DeleteComment)
module.exports = router