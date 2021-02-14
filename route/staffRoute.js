const pool = require("../db/connect")
const express = require("express");
const router = express.Router();
router.get('/staff',
async(req, res, next)=>{
 const staff = await pool.query("SELECT * FROM teacher_tbl")
 const teacher = await staff.rows
 console.log(teacher);
 res.send(teacher)
});
router.post('/staff',
async(req, res, next)=>{
 const first_name = req.body.first_name;
 const other_name = req.body.other_name;
 const gender = req.body.gender;
 const phone_no = req.body.phone_no;
 const email = req.body.email;
 const title = req.body.title;
 const class_id = req.body.class_id;
 const role = req.body.role;
 const subject_id = req.body.subject_id;

 const result = await pool.query("INSERT INTO teacher_tbl (first_name, other_name, gender, phone_no, email, title, class_id, role, subject_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [first_name, other_name, gender, phone_no, email, title, class_id, role, subject_id])
}
)
module.exports =  router;