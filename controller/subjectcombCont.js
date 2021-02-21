const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/subjectcombination')
const table = 'subject_combination_tbl'

// reading of or feching of subjectcombination

exports.fechAllSubjectComb = async (req, res, next) => {
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
//  inserting new subjectcombination into the table

exports.insertNewSubComb = async (req, res, next) => {
  const subject_id = req.body.subject_id
  const class_id = req.body.class_id
  const QueryInstance = new Query(table, ['subject_id', 'class_id'])
  QueryInstance.turnArray()
  try {
    const result = await QueryInstance.postAll([subject_id, class_id])
    if (result.rowCount === 1) {
      res.send({
        message: 'new subject combination saved',
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
// deleting subject combination by class id Note that all the subject combination in for tha class will be deleted

exports.deletebyclassId = async (req, res, next) => {
  const class_id = req.body.class_id
  const result = await Query.deleteByID(table, 'class_id', [class_id])
  if (result === 1) {
    res.send({
      message: 'subject combination successfully deleted',
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

// getting subject combination by class_id
exports.getSubjectCombinationById = async (req, res, next) => {
  const class_id = req.params.id
  const Querynew = new Query(table, null)
  const result = await Querynew.fetchByid(class_id, 'class_id')
  res.send(result)
}

// deleting with both class_id and subject_id
exports.deleteByBoth = async (req, res, next) => {
  const class_id = req.body.class_id
  const subject_id = req.body.subject_id
  const result = await Query.deleteByboth(class_id, subject_id)
  if (result === 1) {
    res.send({
      message: 'subject combination deleted successfully',
    })
  }
}
