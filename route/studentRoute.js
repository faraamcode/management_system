const pool = require('../db/connect')
const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const studentController = require('../controller/studentCont')
const verifyToken = (req, res, next) => {
  const token = req.body.authorization
  jwt.verify(token, "roemichs", (err, authData)=>{
    if (err) {
      return res.status(403).json({
        message: "invalid token"
      })
    }else{
      req.token = authData
    }
  })
 
  next();
}
router.get('/student', verifyToken, studentController.fechAllStudents)
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

router.post('/student/class', verifyToken, studentController.getStudentByClassId)
router.post('/student/admission', studentController.getStudentByAdmission)
router.post('/student/delete', studentController.deletebyAdmission)
router.post('/student', studentController.insertNewStudent)
router.post('/student/update', studentController.updateStudentByAdmission)
router.post("/student/login", studentController.studentSignIn)
module.exports = router
