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
          res.status(200).json({
            message: 'error occured',
          })
        }
      } catch (error) {
        res.status(500).json({ message : "internal error"})
      }
}
// inserting new record on th table

exports.insertNewComment = async (req, res, next) => {
  const checkfields = ['admission_no', 'term', 'session']
  const checkfieldvalue = [req.body.admission_no, req.body.term, req.body.session]
  const isAvailable = await Query.fetchByMultiple(table, checkfields, checkfieldvalue)
  if (isAvailable.length > 0)  {
    return  res.status(400).json({
     message : "already exist"
   })
 }
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
        res.status(201).json({
          message: 'new  comments added saved',
        })
      } else {
        res.status(500).json({
          message: 'error occured',
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500)({ message :"internal error"})
    }
  }
  // deleting students by admission no
  
  exports.DeleteComment = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['admission_no', 'term', 'session'])
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result >= 1) {
      res.status(202).json({
        message: `${req.body.admission_no} commment successfully deleted`,
      })
    }else{
      res.status(400).json({
        message: `${req.body.admission_no} comment not found`,
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
      res.status(202).json({
        message: `${req.body.admission_no} comment successfully updated`,
      })
    }else{
      res.status(400).json({
        "message" : "not updated"
      })
    }
  }
  //   fetching psycomotor using multiple 
  
  exports.fetchByMultiple = async(req, res, next)=>{
      const fields = ['admission_no', 'term', 'session']
      const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
      const result = await Query.fetchByMultiple(table, fields, fieldvalue)
      if (result.length > 0 ) {
        res.status(200).json(result)
      }else{
        res.status(400).json({
          message : "no record found"
        })
      }
  }