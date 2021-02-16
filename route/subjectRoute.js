const express = require('express');
const router =  express.Router()
const pool = require('../db/connect');

// reading of subject table
router.get("/subject", async(req, res, next)=>{
  const result = await pool.query("SELECT * FROM subject_tbl");
  const data = await result.rows
  if (data) {
   
   return res.send(data)
  }
})
// creating a new subject on the table
router.post("/subject", async(req, res, next)=>{
 const subject_name = req.body.subject_name;
 const result = await pool.query("INSERT INTO subject_tbl (subject_name) VALUES ($1)",[subject_name])
 if (result) {
  return res.send({
   "message": "subject saved"
  })
 }
})
//  updating class table by id
router.post("/subject/:id", async(req, res, next)=>{
 const subject_id = req.params.id;
 const subject_name = req.body.subject_name
 const result = await pool.query("UPDATE subject_tbl SET subject_name = $1 WHERE id = $2", [subject_name, subject_id]);
 res.send({
  "message" : "subject updated successfully"
 })
})
//  selcting subject by id
router.get("/subject/:id", async(req, res, next)=>{
 const subject_id = req.params.id
 const result = await pool.query("SELECT * FROM subject_tbl WHERE id= $1", [subject_id])
 const data = await result.rows
 res.send(data)
})
module.exports = router