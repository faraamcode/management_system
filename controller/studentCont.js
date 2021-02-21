const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
const table = 'students_tbl'

// reading of or feching of students

exports.fechAllStudents = async (req, res, next) => {
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
//  inserting new student into the table

exports.insertNewStudent = async (req, res, next) => {
  const fieldvalue = [
    req.body.admission_no,
    req.body.last_name,
    req.body.other_names,
    req.body.parent_no,
    req.body.home_address,
    req.body.admission_type,
    req.body.gender,
    req.body.date_of_birth,
    req.body.class_id,
    req.body.passport,
    req.body.parent_name,
    req.body.parent_email,
    req.body.parent_occupation,
    req.body.class_section_name,
  ]
  const field = [
    'admission_no',
    'last_name',
    'other_names',
    'parent_no',
    'home_address',
    'admission_type',
    'gender',
    'date_of_birth',
    'class_id',
    'passport',
    'parent_name',
    'parent_email',
    'parent_occupation',
    'class_section_name',
  ]

  const QueryInstance = new Query(table, field)
  QueryInstance.turnArray()
  try {
    const result = await QueryInstance.postAll(fieldvalue)
    if (result.rowCount === 1) {
      res.send({
        message: 'new  student added saved',
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
// deleting students by admission no

exports.deletebyAdmission = async (req, res, next) => {
  const admission = req.body.admission_no
  const result = await Query.deleteByID(table, 'admission_no', [admission])
  if (result === 1) {
    res.send({
      message: `student ${admission} successfully deleted`,
    })
  }
}

// updating subject combination using class id
exports.updateSubjectCombById = async (req, res, next) => {
  const subject_id = req.body.subject_id
  const class_id = req.body.class_id
  const fieldvalue = [subject_id]
  const updatefield = 'class_id'
  const updatevalue = [class_id]
  const fields = await Query.turnUpdateArray(['subject_id'])
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

// getting students by class id
exports.getStudentByClassId = async (req, res, next) => {
  const class_id = req.body.class_id
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(class_id, 'class_id')
  res.send(result)
}

// getting students by ADadmission_no
exports.getStudentByAdmission = async (req, res, next) => {
  const admission_no = req.body.admission_no
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(admission_no, 'admission_no')
  res.send(result)
}
