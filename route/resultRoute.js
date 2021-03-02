const pool = require('../db/connect')
const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const resultController = require('../controller/resultCont')

/*
==========
ROUTES
==========
*/
// inputing new result
router.get('/result/test', resultController.testResult)
router.post("/result", resultController.insertNewResult)

// getting term result for a studennt
router.get('/result/term', resultController.getStudentTermResult)

// getting term result for a whole class
router.get("/result/term/class", resultController.getClassTermResult)

// gettiing a session result for a student
router.get("/result/session/student", resultController.getStudentSessionResult)

// getting a session result for a class
router.get("/result/session/class", resultController.getClassSessionResult)

/*
==========
LOGICS
==========
*/

// getting the heightest and the lowest score a particular subject



module.exports = router
