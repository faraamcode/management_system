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
let Maxresult = []
const fetchMax = async (arr,term, session)=>{
  if(arr.length ===0 ) return Maxresult
 
   const subject = arr[0]
    const max =  await pool.query("SELECT MAX(total) AS maximumscore FROM year1_result_table WHERE subject_id = $1 AND term = $2 AND session= $3", [arr[0], term, session])
    const maxValue = max.rows[0]
    Maxresult.push({subject,  maxValue})
    return fetchMax(arr.slice(1), term, session)
  
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
const subjects = [... new Set(result.map((subject)=>{
  return subject.subject_id
}))]
const minimumscore = await  fetchMax(subjects, req.body.term, req.body.session)
console.log(minimumscore);
if(result.length === 0){
    return res.send({
        message : "no result found"
    })
} else if(result.length > 0){
 return res.send({result,minimumscore});
}else{
    return res.send({
        message :" error occured"
    })
}
}
// getting mideterm for a class

// getting term result for a whole class
exports.getClassTermResult = async(req, res, next)=>{
  const fieldvalue = [
      req.body.term,
      req.body.session
    ]
    const field = [
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

// gettiing a session result for a student
exports.getStudentSessionResult = async(req, res, next)=>{
  const fieldvalue = [
      req.body.admission_no,
      req.body.session
    ]
    const field = [
  'admission_no',
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

// getting a session result for a class
exports.getClassSessionResult = async(req, res, next)=>{
  const fieldvalue = [
      req.body.session
    ]
    const field = [
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

/*
==========
LOGICS
==========
*/
// getting the heightest and the lowest score a particular subject