const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')

exports.getSubject = async (req, res, next) => {
  const data = await Query.fetchAll('subject_tbl')
  if (data) {
    return res.send(data)
  }
}

exports.postSubject = async (req, res, next) => {
  const subject_name = req.body.subject_name
  const Querynew = new Query('subject_tbl', ['subject_name'])
  const result = Querynew.postAll([subject_name])
  if (result) {
    return res.send({
      message: 'subject saved',
    })
  }
}

exports.postSubjectById = async (req, res, next) => {
  const subject_id = req.params.id
  const subject_name = req.body.subject_name
  const table = 'subject_tbl'
  const fieldvalue = [subject_name]
  const updatefield = 'id'
  const updatevalue = [subject_id]
  const fields = await Query.turnUpdateArray(['subject_name'])
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
  res.send({
    message: 'subject updated successfully',
  })
}
exports.getSubjectById = async (req, res, next) => {
  const subject_id = req.params.id
  const Querynew = new Query('subject_tbl', null)
  const data = await Querynew.fetchByid(subject_id)
  res.send(data)
}
exports.deleteSubjectById = async (req, res, next) => {
  const field = 'id'
  const table = 'subject_tbl'
  const subject_id = [req.params.id]
  const result = await Query.deleteByID(table, field, subject_id)
  if (result === 1) {
    res.send({
      message: 'subject deleted!',
    })
  } else {
    res.send({
      message: 'error occured',
    })
  }
}
