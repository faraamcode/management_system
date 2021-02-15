const express = require('express');
const { restart } = require('nodemon');
const router =  express.Router()
const pool = require('../db/connect');
const { route } = require('./studentRoute');
// reading of class table
router.get("/class", async(req, res, next)=>{
  const result = await pool.query("SELECT * FROM class_tbl");
  const data = await result.rows
  if (data) {
   
   return res.send(data)
  }
})
// creating a new class on the table
router.post("/class", async(req, res, next)=>{
 const class_name = req.body.class_name;
 const result = await pool.query("INSERT INTO class_tbl (class_name) VALUES ($1)",[class_name])
 if (result) {
  return res.send({
   "message": "class saved"
  })
 }
})
//  updating class table by id
router.post("/class/:id", async(req, res, next)=>{
 const class_id = req.params.id;
 const class_name = req.body.class_name
 const result = await pool.query("UPDATE class_tbl SET class_name = $1 WHERE id = $2", [class_name, class_id]);
 res.send({
  "message" : "class updated successfully"
 })
})
//  selcting class by id
router.get("/class/:id", async(req, res, next)=>{
 const class_id = req.params.id
 const result = await pool.query("SELECT * FROM class_tbl WHERE id= $1", [class_id])
 const data = await result.rows
 res.send(data)
})
module.exports = router