const express = require('express');
const pool = require('../db/connect');
const Query = require("../model/queryClass")

exports.getSubject = async(req, res, next)=>{
  const data = await Query.fetchAll("subject_tbl");
  if (data) {
   return res.send(data)
  }
}
exports.postSubject = async(req, res, next)=>{
 const subject_name = req.body.subject_name;
 const Querynew = new Query("subject_tbl", ["subject_name"])
 const result = Querynew.postAll([subject_name])
 if (result) {
  return res.send({
   "message": "subject saved"
  })
 }
}

exports.postSubjectById = async(req, res, next)=>{
 const subject_id = req.params.id;
 const subject_name = req.body.subject_name
 const result = await pool.query("UPDATE subject_tbl SET subject_name = $1 WHERE id = $2", [subject_name, subject_id]);
 res.send({
  "message" : "subject updated successfully"
 })
}
exports.getSubjectById = async(req, res, next)=>{
 const subject_id = req.params.id
 // const result = await pool.query("SELECT * FROM subject_tbl WHERE id= $1", [subject_id])
 const Querynew = new Query("subject_tbl", null)

 const data = await Querynew.fetchByid(subject_id)
 res.send(data)
}