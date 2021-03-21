const express = require('express');
const pool = require('../db/connect')
const { fieldvalue } = require('../model/psycomotorClass')
const Query = require('../model/psycomotorClass')
const table = 'year1_affective_domain'
// fetching all the records from the table 
exports.fetchAllAffective = async(req, res, next)=>{
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

exports.insertNewAffective = async (req, res, next) => {
    const fieldvalue = [
      req.body.admission_no,
      req.body.class_id,
      req.body.term,
      req.body.affective_domain,
      req.body.grade,
      req.body.session
    ]
    const field = [
      'admission_no',
      'class_id',
      'term',
      'affective_domain',
      'grade',
      'session'
    ]
  
    const QueryInstance = new Query(table, field)
    QueryInstance.turnArray()
    try {
      const result = await QueryInstance.postAll(fieldvalue)
      if (result.rowCount === 1) {
        res.send({
          message: 'new  affective_domain added saved',
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
  
  exports.DeleteAffective = async (req, res, next) => {
    const fields = await Query.turnUpdateArrayWithAND(['admission_no', 'term', 'session','affective_domain'])
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session, req.body.affective_domain]
    const result = await Query.DeleteWithMultiple(table, fields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} affective_domain successfully deleted`,
      })
    }
  }
  // updating psycomotor by multiple clause

  exports.UpdateAffective = async (req, res, next) => {
    const updatefields = ['grade']
    const clausefields = ['admission_no', 'term', 'session', 'affective_domain']
    const fieldvalue = [req.body.grade, req.body.admission_no, req.body.term, req.body.session, req.body.affective_domain]
    const result = await Query.UpdateWithMultiple(table, updatefields, clausefields, fieldvalue)
    if (result === 1) {
      res.send({
        message: `${req.body.admission_no} affective_domain successfully updated`,
      })
    }else{
        res.send({
            "message" : "error occured"
        })
    }
  }
//   fetching affective_domain using multiple 

exports.fetchByMul = async(req, res, next)=>{
    const fields = ['admission_no', 'term', 'session']
    const fieldvalue = [req.body.admission_no, req.body.term, req.body.session]
    const result = await Query.fetchByMultiple(table, fields, fieldvalue)
   
      res.send(result)

}

