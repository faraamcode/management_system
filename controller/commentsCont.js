const express = require('express')
const pool = require('../db/connect')
const { fieldvalue } = require('../model/psycomotorClass')
const Query = require('../model/psycomotorClass')
const table = 'year1_comments'
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

exports.insertNewComment = async (req, res, next) => {
    const fieldvalue = [
      
      req.body.admission_no,
      req.body.class_id,
      req.body.term,
      req.body.session,
      req.body.class_teacher,
    
     
    ]
    const field = [
      'admission_no',
      'class_id',
      'term',
      'session',
      'class_teacher'
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.send({
          message: 'new  comments added saved',
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
  
  exports.DeleteComment = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['admission_no', 'term', 'session'])
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} comment successfully deleted`,
      })
    }
  }
  // updating psycomotor by multiple clause
  
  exports.UpdateComment = async (req, res, next) => {
    const updatefields = ['class_teacher']
    const clausefields = ['admission_no', 'term', 'session']
    const fieldvalue = [req.body.class_teacher, req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.UpdateWithMultiple(table, updatefields, clausefields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} comment successfully updated`,
      })
    }else{
      res.send({
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