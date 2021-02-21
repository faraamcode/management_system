const pool = require('../db/connect')
const express = require('express')
const router = express.Router()
const studentController = require('../controller/studentCont')
router.get('/student', studentController.fechAllStudents)
router.get('/student/:id', async (req, res, next) => {
  const admission_no = req.params.id
  const data = await pool.query(
    'SELECT * FROM students_tbl WHERE admission_no = $1 LIMIT 1',
    [admission_no]
  )
  const student = await data.rows
  console.log(student)
  res.send(student)
})
router.post('/student/class', studentController.getStudentByClassId)
router.post('/student/admission', studentController.getStudentByAdmission)
router.post('/student/delete', studentController.deletebyAdmission)
router.post('/student', studentController.insertNewStudent)
router.post('/student/update', async (req, res, next) => {
  const admission_no = req.body.admission_no
  const last_name = req.body.last_name
  const other_names = req.body.other_names
  const parent_no = req.body.parent_no
  const home_address = req.body.home_address
  const admission_type = req.body.admission_type
  const gender = req.body.gender
  const date_of_birth = req.body.date_of_birth
  const class_id = req.body.class_id
  const passport = req.body.passport
  const parent_name = req.body.parent_name
  const parent_email = req.body.parent_email
  const parent_occupation = req.body.parent_occupation
  const class_section_name = req.body.class_section_name

  const result = await pool.query(
    'UPDATE students_tbl SET last_name = $1, other_names = $2, parent_no = $3, home_address = $4, admission_type = $5, gender = $6, date_of_birth = $7, class_id = $8, passport = $9, parent_name = $10, parent_email = $11, parent_occupation = $12, class_section_name = $13 WHERE admission_no =$14 ',
    [
      last_name,
      other_names,
      parent_no,
      home_address,
      admission_type,
      gender,
      date_of_birth,
      class_id,
      passport,
      parent_name,
      parent_email,
      parent_occupation,
      class_section_name,
      admission_no,
    ]
  )
})
module.exports = router
