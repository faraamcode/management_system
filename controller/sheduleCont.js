const express = require('express')
const pool = require('../db/connect')
const { fieldvalue } = require('../model/psycomotorClass')
const Query = require('../model/psycomotorClass')
const table = 'school_schedule'

// inserting new record on th table

exports.insertNewSchedule = async (req, res, next) => {
    const fieldvalue = [
      req.body.term,
      req.body.session,
      req.body.closing_time,
      req.body.open_time
    
     
    ]
    const field = [
      'term',
      'session',
      'closing_time',
      'open_time'
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.send({
          message: 'new  schedule added saved',
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
  
  exports.DeleteSchedule = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['term', 'session'])
    const fieldvalue = [req.body.term, req.body.session]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} schedule successfully deleted`,
      })
    }
  }
  // updating psycomotor by multiple clause
  
  exports.UpdateSchedule = async (req, res, next) => {
    //   note that the field to be updated needs to be sent too
    const updatefields = [req.body.updatefield] // the actual field name should be provided(closing_time or open_time)
    const clausefields = ['term', 'session']
    const fieldvalue = [req.body.update, req.body.term, req.body.session]
    const result = await Query.UpdateWithMultiple(table, updatefields, clausefields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} psycomotor successfully updated`,
      })
    }else{
      res.send({
        "message" : "error occured"
      })
    }
  }
  //   fetching psycomotor using multiple 
  
  exports.fetchByMultiple = async(req, res, next)=>{
      const fields = ['term', 'session']
      const fieldvalue = [req.body.term, req.body.session]
      const result = await Query.fetchByMultiple(table, fields, fieldvalue)
     
        res.send(result)
  
  }