const express = require('express')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const pool = require('../db/connect')
const Query = require('../model/queryClass')
const QueryMultiple = require("../model/psycomotorClass")
const table = 'year1_result_table'
/*
==========
ROUTES
==========
*/
// inputing new result
exports.insertNewResult = async (req, res, next)=>{
    const fieldvalue = [
        req.body.class_id,
        req.body.subject_id,
        req.body.admission_no,
        req.body.term,
        req.body.first_ca,
        req.body.second_ca,
        req.body.exam,
        req.body.total,
        req.body.grade,
        req.body.session
      ]
      const field = [
        'class_id',
        'subject_id',
        'admission_no',
        'term',
        'first_ca',
        'second_ca',
        'exam',
        'total',
        'grade',
        'session'
      ]
    
      const QueryInstance = new Query(table, field)
      QueryInstance.turnArray()
      try {
        const result = await QueryInstance.postAll(fieldvalue)
        if (result.rowCount === 1) {
          res.send({
            message: 'new  result  added ',
          })
        } else {
          res.send({
            message: 'error occured',
          })
        }
      } catch (error) {
        console.log(error)
        res.send({ erclass_id})
      }
}
// geting midterm result for a student
// getting term result for a studennt
exports.getStudentTermResult = async(req, res, next)=>{
    const fieldvalue = [
        req.body.admission_no,
        req.body.term,
        req.body.session
      ]
      const field = [
        'admission_no',
        'term',
        'session'
      ] 
const result = await QueryMultiple.fetchByMultiple(table, field, fieldvalue)
if(result.length === 0){
    return res.send({
        message : "no result found"
    })
} else if(result.length > 0){
 return res.send(result);
}else{
    return res.send({
        message :" error occured"
    })
}
}
// getting mideterm for a class

// getting term result for a whole class
// gettiing a session result for a student
// getting a session result for a class

/*
==========
LOGICS
==========
*/
// getting the heightest and the lowest score a particular subject