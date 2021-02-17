const express = require('express');
const router =  express.Router()
const pool = require('../db/connect');
const subjectController = require("../controller/subjectCont")
// reading of subject table
router.get("/subject", subjectController.getSubject)
// creating a new subject on the table
router.post("/subject", subjectController.postSubject)
//  updating class table by id
router.post("/subject/:id", subjectController.postSubjectById)
//  selcting subject by id
router.get("/subject/:id", subjectController.getSubjectById)
module.exports = router