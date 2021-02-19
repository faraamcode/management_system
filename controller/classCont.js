const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
exports.getClass = async (req, res, next) => {
  const data = await Query.fetchAll('class_tbl')
  const result = await Query.turnUpdateArray(['adewale'])
  console.log(result)
  if (data) {
    return res.send(data)
  }
}

exports.postClass = async (req, res, next) => {
  const class_name = req.body.class_name
  const Querynew = new Query('class_tbl', ['class_name'])
  Querynew.turnArray()
  const result = await Querynew.postAll([class_name])
  if (result) {
    return res.send({
      message: 'class saved',
    })
  }
}

exports.updateById = async (req, res, next) => {
  const class_id = req.params.id
  const class_name = req.body.class_name
  const table = 'class_tbl'
  const fieldvalue = [class_name]
  const updatefield = 'id'
  const updatevalue = [class_id]
  const fields = await Query.turnUpdateArray(['class_name'])
  const result = await Query.updateByID(
    table,
    fields,
    fieldvalue,
    updatefield,
    updatevalue
  )
  if (result === 1) {
    res.send({
      message: 'upaded succesfully',
    })
  } else {
    res.send({
      message: 'error occured',
    })
  }
}
exports.getClassById = async (req, res, next) => {
  const class_id = req.params.id
  const Querynew = new Query('class_tbl', null)
  const result = await Querynew.fetchByid(class_id)
  res.send(result)
}
exports.deleteClassById = async (req, res, next) => {
  const id = req.params.id
  const table = 'class_tbl'
  const field = 'id'
  const result = await Query.deleteByID(table, field, [id])
  if (result === 1) {
    res.send({
      message: 'class deleted succesfully',
    })
  } else {
    res.send({
      message: 'error occured',
    })
  }
}
