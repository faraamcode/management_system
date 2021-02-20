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
//  updating class table by id
// router.post('/subject/:id', async (req, res, next) => {
//   const subject_id = req.params.id
//   const subject_name = req.body.subject_name
//   const result = await pool.query(
//     'UPDATE subject_tbl SET subject_name = $1 WHERE id = $2',
//     [subject_name, subject_id]
//   )
//   res.send({
//     message: 'subject updated successfully',
//   })
// })
// //  selcting subject by id
// router.get('/subject/:id', async (req, res, next) => {
//   const subject_id = req.params.id
//   const result = await pool.query('SELECT * FROM subject_tbl WHERE id= $1', [
//     subject_id,
//   ])
//   const data = await result.rows
//   res.send(data)
// })
module.exports = router
