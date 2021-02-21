const express = require('express')
const router = express.Router()
const pool = require('../db/connect')
const subjectCombController = require('../controller/subjectcombCont')

// reading of subject combination table
router.get('/subjectcombination', subjectCombController.fechAllSubjectComb)
// creating a new subject combination on the table
router.post('/subjectcombination', subjectCombController.insertNewSubComb)
//  deleting a subject combination on the table by class_id
router.post(
  '/subjectcombination/delete/',
  subjectCombController.deletebyclassId
)
//  updating subject comb by class_id
router.post(
  '/subjectcombination/update/',
  subjectCombController.updateSubjectCombById
)
//  selecting subject comb by class_id
router.get(
  '/subjectcombination/:id',
  subjectCombController.getSubjectCombinationById
)
// deleting by both suject and class id
router.post(
  '/subjectcombination/delete/byboth',
  subjectCombController.deleteByBoth
)
module.exports = router
