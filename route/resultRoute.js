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
router.post("/result", resultController.insertNewResult)
// getting term result for a studennt
router.get('/result/term', resultController.getStudentTermResult)
// getting term result for a whole class
// gettiing a session result for a student
// getting a session result for a class

/*
==========
LOGICS
==========
*/
// getting the heightest and the lowest score a particular subject



module.exports = router
