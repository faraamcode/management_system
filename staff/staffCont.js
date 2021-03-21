const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const table = 'teacher_tbl'

// reading of or feching of staffs

exports.fechAllStaffs = async (req, res, next) => {
  try {
    const result = await Query.fetchAll(table)
    if (result) {
      const userdata = req.token;
      res.status(200).json({result, userdata})
    } else {
      res.send({
        message: 'error occured',
      })
    }
  } catch (error) {
    res.send({ error })
  }
}
//  inserting new staff into the table

exports.insertNewStaff = async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const fieldvalue = [
    req.body.first_name,
    req.body.other_name,
    req.body.gender,
    req.body.phone_no,
    req.body.email,
    req.body.title,
    req.body.class_id,
    req.body.role,
    req.body.subject_id,
    hashed
  ]
  const field = [
    'first_name',
    'other_name',
    'gender',
    'phone_no',
    'email',
    'title',
    'class_id',
    'role',
    'subject_id',
    'password'
  ]

  const QueryInstance = new Query(table, field)
  const ifExist = await QueryInstance.fetchByid(req.body.email, 'email')

  if (ifExist.length ===1 ) {
    return res.status(400).json({
      message : "user already exist"
    })
  }


  QueryInstance.turnArray()
  try {
    const result = await QueryInstance.postAll(fieldvalue)
    if (result.rowCount === 1) {
      res.send({
        message: 'new  staff  added ',
      })
    } else {
      res.send({
        message: 'error occured',
      })
    }
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
}
// deleting a staff with email by admission no

exports.deletebyEmail = async (req, res, next) => {
  const email = req.body.email
  const result = await Query.deleteByID(table, 'email', [email])
  if (result === 1) {
    res.send({
      message: `staff ${email} successfully deleted`,
    })
  }
}

// updating subject combination using class id
exports.updateStaffByEmail = async (req, res, next) => {
    const fieldvalue = [
        req.body.first_name,
        req.body.other_name,
        req.body.gender,
        req.body.phone_no,
        req.body.title,
        req.body.class_id,
        req.body.role,
        req.body.subject_id
      ]
      const field = [
        'first_name',
        'other_name',
        'gender',
        'phone_no',
        'title',
        'class_id',
        'role',
        'subject_id'
      ]

  const updatefield = 'email'
  const updatevalue = [req.body.email]
  const fields = await Query.turnUpdateArray(field)
  const result = await Query.updateByID(
    table,
    fields,
    fieldvalue,
    updatefield,
    updatevalue
  )
  if (result === 1) {
    res.send({
      message: 'upaded succesfully',
    })
  } else {
    res.send({
      message: 'error occured',
    })
  }
}

// getting staff by email
exports.getStaffByAdmission = async (req, res, next) => {
  const email = req.body.email
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(email, 'email')
  res.send(result)
}
//  teachers login controler
exports.teacherLogin = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(email, 'email')
  if (result.length < 1) {
    return res.status(401).json({
      message : "user does not exist"
    })
  }else{

    if (result[0].role !=="teacher") {
      return res.status(401).json({
        message : "User is not a teacher"
      }) 
    }

   const dbpassword = result[0].password
   const isSigned = await bcrypt.compare(password, dbpassword)
   if (!isSigned) {
    res.status(401).json({
      message :'invalid password'
    })
   }else{
     const user = {
       email : req.body.email,
       role: result[0].role
     }
     jwt.sign({user}, "roemichsteacher", { expiresIn: '2h' }, (err, token)=>{
       if(!err) res.status(200).json({token})
     })
   }

  }
}
exports.adminLogin = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(email, 'email')
  if (result.length < 1) {
    return res.status(401).json({
      message : "user does not exist"
    })

  }else{

    if (result[0].role !=="admin") {
      return res.status(401).json({
        message : "User is not an Admin"
      }) 
    }

   const dbpassword = result[0].password
   const isSigned = await bcrypt.compare(password, dbpassword)
   if (!isSigned) {
    res.status(401).json({
      message :'invalid password'
    })

   }else{
     const user = {
       email : req.body.email,
       role: result[0].role
     }
     jwt.sign({user}, "roemichsadmin", { expiresIn: 60 * 60 * 2 }, (err, token)=>{
       if(!err) res.status(200).json({token})
     })
   }

  }
}