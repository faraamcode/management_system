const pool = require('../db/connect')
const express = require('express')
const pdf = require('html-pdf')
const jwt = require('jsonwebtoken')
const router = express.Router()
const resultController = require('./resultCont')
const pdfTemplate = require('../documents/index.jsx')

router.post('/result/check', resultController.checkIfAvailable)

/*
==========
ROUTES
==========
*/
// inputing new result
router.post(
  '/result',
  resultController.checkIfAvailable,
  resultController.insertNewResult
)
// inputing new second ca result
router.post('/result/secondca', resultController.insertSecondCa)

// inputing new exam score
router.post('/result/exam', resultController.insertExam)

// getting term result for a studennt
router.post(
  '/result/term',
  resultController.getStudentTermResult,
  resultController.downloadResult
)

// getting term result for a whole class
router.get('/result/term/class', resultController.getClassTermResult)

// gettiing a session result for a student
router.get('/result/session/student', resultController.getStudentSessionResult)

// getting a session result for a class
router.get('/result/session/class', resultController.getClassSessionResult)

/*
==========
LOGICS
==========
*/

// getting the heightest and the lowest score a particular subject

module.exports = router
