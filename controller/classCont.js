const express = require('express');
const pool = require('../db/connect');
const Query = require("../model/queryClass")
exports.getClass = async(req, res, next)=>{
  const data =  await Query.fetchAll("class_tbl");
  if (data) {
   return res.send(data)
  }
 }


 exports.postClass = async(req, res, next)=>{
 const class_name = req.body.class_name;
 const Querynew = new Query("class_tbl", ["class_name"])
 Querynew.turnArray();
 const result = await Querynew.postAll([class_name]);
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
const Querynew = new Query("class_tbl", null);
const result = await Querynew.fetchByid(class_id);
 res.send(result)
}