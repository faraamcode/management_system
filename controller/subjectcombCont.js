const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
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
// deleting subject combination by class id

exports.deletebyclassId = async (req, res, next) => {
  const class_id = req.body.class_id
  const result = await Query.deleteByID(table, 'class_id', [class_id])
  if (result === 1) {
    res.send({
      message: 'subject combination successfully deleted',
    })
  }
}
