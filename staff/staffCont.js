const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
const table = 'teacher_tbl'

// reading of or feching of staffs

exports.fechAllStaffs = async (req, res, next) => {
  try {
    const result = await Query.fetchAll(table)
    if (result) {
      res.send(result)
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
  const fieldvalue = [
    req.body.first_name,
    req.body.other_name,
    req.body.gender,
    req.body.phone_no,
    req.body.email,
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
    'email',
    'title',
    'class_id',
    'role',
    'subject_id'
  ]

  const QueryInstance = new Query(table, field)
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

