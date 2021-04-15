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
  //  check the presence of the psycomotor
  const checkfields = ['admission_no', 'term', 'session']
  const checkfieldvalue = [req.body.admission_no, req.body.term, req.body.session]
  const isAvailable = await Query.fetchByMultiple(table, checkfields, checkfieldvalue)
  if (isAvailable.length > 0) {
    next()
  }else{
    // new insertion

    const fieldvalue = [
      req.body.admission_no,
      req.body.class_id,
      req.body.term,
      req.body.session,
      req.body.grade,
    ]
    const field = [
      'admission_no',
      'class_id',
      'term',
      'session',
      req.body.psycomotor_name,
  
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.status(201).json({
          message: 'new  psycommotor added saved',
        })
      } else {
        res.status(500)({
          message: 'error occured',
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500)({
        message: 'error occured',
      })
    }
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
  // updating psycomotor by multiple clause

  exports.UpdatePsycomotor = async (req, res, next) => {
      
      const updatefields = [req.body.psycomotor_name]
    const clausefields = ['admission_no', 'term', 'session']
    const fieldvalue = [req.body.grade, req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.UpdateWithMultiple(table, updatefields, clausefields, fieldvalue)
    if (result === 1) {
      res.status(201).json({
        message: `${req.body.admission_no} psycomotor successfully updated`,
      })
    }else{
        res.status(500).json({
            "message" : "error occured"
        })
    }
  }
//   fetching psycomotor using multiple 

exports.fetchByMultiple = async(req, res, next)=>{
    const fields = ['admission_no', 'term', 'session']
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.fetchByMultiple(table, fields, fieldvalue)
   
      res.send(result)

}