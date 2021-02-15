const pool = require("../db/connect")
const express = require("express");
const router = express.Router();
router.get('/student',
async(req, res, next)=>{
 const data = await pool.query("SELECT * FROM students_tbl")
 const student = await data.rows
 console.log(student);
 res.send(student)
});
router.get('/student/:id', async(req, res, next)=>{
 const admission_no = req.params.id
 const data = await pool.query("SELECT * FROM students_tbl WHERE admission_no = $1 LIMIT 1", [admission_no])
 const student = await data.rows
 console.log(student);
 res.send(student)
}
);
router.get('/student/class/:class', async(req, res, next)=>{
 const class_id = req.params.class
 const data = await pool.query("SELECT * FROM students_tbl WHERE class_id = $1 LIMIT 1", [class_id])
 const student = await data.rows
 console.log(student);
 res.send(student)
}
);
router.get('/student/delete/:admission', async(req, res, next)=>{
 const admission_no = req.params.admission
 const data = await pool.query("DELETE  FROM students_tbl WHERE admission_no = $1", [admission_no])
 const student = await data.rowCount
 if(student===0){
  return res.send({
   "message": "no student deleted"
  })
 }else if(student===1){
    return res.send({
   "message": "a single result deleted"
  })
 }else{
    return res.send({
   "message":  `${student}single result deleted`
  })
 }
}
);
router.post('/student',
async(req, res, next)=>{
 const admission_no = req.body.admission_no;
 const last_name = req.body.last_name;
 const other_names = req.body.other_names;
 const parent_no = req.body.parent_no;
 const home_address = req.body.home_address;
 const admission_type = req.body.admission_type;
 const gender = req.body.gender;
 const date_of_birth = req.body.date_of_birth;
 const class_id = req.body.class_id;
 const passport = req.body.passport;
 const parent_name = req.body.parent_name;
 const parent_email = req.body.parent_email;
 const parent_occupation = req.body.parent_occupation;
 const class_section_name = req.body.class_section_name;


 const result = await pool.query("INSERT INTO students_tbl (admission_no, last_name, other_names, parent_no, home_address, admission_type, gender, date_of_birth, class_id, passport, parent_name, parent_email, parent_occupation, class_section_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [admission_no, last_name, other_names, parent_no, home_address, admission_type, gender, date_of_birth, class_id, passport, parent_name, parent_email, parent_occupation, class_section_name])
})
router.post('/student/update',
async(req, res, next)=>{
 const admission_no = req.body.admission_no;
 const last_name = req.body.last_name;
 const other_names = req.body.other_names;
 const parent_no = req.body.parent_no;
 const home_address = req.body.home_address;
 const admission_type = req.body.admission_type;
 const gender = req.body.gender;
 const date_of_birth = req.body.date_of_birth;
 const class_id = req.body.class_id;
 const passport = req.body.passport;
 const parent_name = req.body.parent_name;
 const parent_email = req.body.parent_email;
 const parent_occupation = req.body.parent_occupation;
 const class_section_name = req.body.class_section_name;


 const result = await pool.query("UPDATE students_tbl SET last_name = $1, other_names = $2, parent_no = $3, home_address = $4, admission_type = $5, gender = $6, date_of_birth = $7, class_id = $8, passport = $9, parent_name = $10, parent_email = $11, parent_occupation = $12, class_section_name = $13 WHERE admission_no =$14 ", [last_name, other_names, parent_no, home_address, admission_type, gender, date_of_birth, class_id, passport, parent_name, parent_email, parent_occupation, class_section_name, admission_no])

}
)
module.exports =  router;