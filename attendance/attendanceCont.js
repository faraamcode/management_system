const express = require('express')
const pool = require('../db/connect')
const { fieldvalue } = require('../model/psycomotorClass')
const Query = require('../model/psycomotorClass')
const table = 'year1_attendance'
// inserting new record on th table

exports.insertNewAttendance = async (req, res, next) => {
  const checkfields = ['admission_no', 'term', 'session']
  const checkfieldvalue = [req.body.admission_no, req.body.term, req.body.session]
  const isAvailable = await Query.fetchByMultiple(table, checkfields, checkfieldvalue)
  if (isAvailable.length > 0)  res.status(400).json({
    message : "already exist"
  })
    const fieldvalue = [
      req.body.admission_no,
      req.body.class_id,
      req.body.term,
      req.body.session,
      req.body.time_school_open,
      req.body.present_time,
      req.body.absent_time,
    
     
    ]
    const field = [
      'admission_no',
      'class_id',
      'term',
      'session',
      'time_school_open',
      'present_time',
      'absent_time'
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.status(201).json({
          message: 'new attendance created added saved',
        })
      } else {
        res.status(500).json({
          message: 'error occured',
        })
      }
    } catch (error) {
      console.log(error)
      res.send({ error })
    }
  }

  // deleting students by admission no
  exports.DeleteAttendance = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['admission_no', 'term', 'session'])
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result === 1) {
      res.status(202).json({
        message: `${req.body.admission_no} Attendance  successfully deleted`,
      })
    }else{
      res.status(400).json({
        message: `${req.body.admission_no} Attendance not found`,
      })
      
    }
  }
  
  // updating psycomotor by multiple clause
  
  exports.UpdateAttendance = async (req, res, next) => {
    //   note that the field to be updated needs to be sent too
    const updatefields = [req.body.updatefield] // the actual field name should be provided(present_time or absent_time or time_school_open)
    const clausefields = ['admission_no', 'term', 'session']
    const fieldvalue = [req.body.update, req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.UpdateWithMultiple(table, updatefields, clausefields, fieldvalue)
    if (result === 1) {
      res.status(202).json({
        message: `${req.body.admission_no} psycomotor successfully updated`,
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