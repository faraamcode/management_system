const express = require('express')
const pool = require('../db/connect')
const Query = require('../model/queryClass')
const table = 'class_tbl'
exports.getClass = async (req, res, next) => {
  const data = await Query.fetchAll('class_tbl')
  if (data) {
    return res.status(200).json(data)
  }else{
    return res.status(400).json({
      message: 'error occured',
    })
  }
}

exports.postClass = async (req, res, next) => {
  const class_name = req.body.class_name

  const Querynew = new Query('class_tbl', ['class_name'])
  const checking = await Querynew.fetchByid(class_name, 'class_name')

  if(checking.length > 0){
    return res.status(403).json({
      message: 'class already exist',
    })
  }

  Querynew.turnArray()
  const result = await Querynew.postAll([class_name])
  if (result) {
    return res.status(200).json({
      message: 'class saved',
    })
  }else{
    return res.status(400).json({
      message: 'error occured',
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
    res.status(201).json({
      message: 'upaded succesfully',
    })
  } else {
    res.status(401).json({
      message: 'error occured',
    })
  }
}

exports.getClassById = async (req, res, next) => {
  const class_id = req.params.id
  const Querynew = new Query('class_tbl', null)
  const result = await Querynew.fetchByid(class_id, 'id')
  if (result.length > 0 ) {
    res.status(200).json(result)
  }else{
    res.status(400).json({
      message : "no record found"
    })
  }
}

exports.deleteClassById = async (req, res, next) => {
  const id = req.params.id

  const field = 'id'
  const result = await Query.deleteByID(table, field, [id])
  if (result === 1) {
    res.status(200).json({
      message: 'class deleted succesfully',
    })
  } else {
    res.status(400).json({
      message: 'error occured',
    })
  }
}
