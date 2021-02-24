const express = require('express')
const pool = require('../db/connect')
const { fieldvalue } = require('../model/psycomotorClass')
const Query = require('../model/psycomotorClass')
const table = 'year1_psycomotor'
// fetching all the records from the table 
exports.fetchAllpsycomotor = async(req, res, next)=>{
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
// inserting new record on th table

exports.insertNewPsycomotor = async (req, res, next) => {
    const fieldvalue = [
      req.body.admission_no,
      req.body.class_id,
      req.body.term,
      req.body.sycomoto_name,
      req.body.grade,
      req.body.session
    ]
    const field = [
      'admission_no',
      'class_id',
      'term',
      'sycomoto_name',
      'grade',
      'session'
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.send({
          message: 'new  psycommotor added saved',
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
  
  exports.DeletePsycomotor = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['admission_no', 'term', 'session','sycomoto_name'])
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session, req.body.sycomoto_name]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} psycomotor successfully deleted`,
      })
    }
  }