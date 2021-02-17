const express = require('express');
const pool = require('../db/connect');
exports.getClass = async(req, res, next)=>{
  const result = await pool.query("SELECT * FROM class_tbl");
  const data = await result.rows
  if (data) {
   
   return res.send(data)
  }
 }
 exports.postClass = async(req, res, next)=>{
 const class_name = req.body.class_name;
 const result = await pool.query("INSERT INTO class_tbl (class_name) VALUES ($1)",[class_name])
 if (result) {
  return res.send({
   "message": "class saved"
  })
 }
}
exports.updateById = async(req, res, next)=>{
 const class_id = req.params.id;
 const class_name = req.body.class_name
 const result = await pool.query("UPDATE class_tbl SET class_name = $1 WHERE id = $2", [class_name, class_id]);
 res.send({
  "message" : "class updated successfully"
 })
}
exports.getClassById = async(req, res, next)=>{
 const class_id = req.params.id
 const result = await pool.query("SELECT * FROM class_tbl WHERE id= $1", [class_id])
 const data = await result.rows
 res.send(data)
}