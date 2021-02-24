const express = require('express')
const pool = require('../db/connect')
module.exports = class Query {
  constructor(tablename, fieldname) {
    this.tablename = tablename
    this.fieldname = fieldname
    this.altFieldName = fieldname
  }
  //  turning the fileds to strings
  turnArray() {
    this.fieldname = this.fieldname.map((item) => item).join(', ')
  }

  // performing the query one after the other

  // select all data from the table
  static async fetchAll(table) {
    this.tablename = table
    this.result = await pool.query(`SELECT * FROM ${this.tablename}`)
    this.data = await this.result.rows
    return this.data
  }
  // inserting all data into a table
  async postAll(values) {
    this.values = values
    this.fieldvalueNumber = this.values
      .map((items, index) => {
        return `$${index + 1}`
      })
      .join(', ')

    this.result = await pool.query(
      `INSERT INTO ${this.tablename} (${this.fieldname}) VALUES (${this.fieldvalueNumber})`,
      this.values
    )

    return this.result
  }
  // fetching a data by id
  async fetchByid(id, field) {
    this.field = field
    this.id = id
    this.result = await pool.query(
      `SELECT * FROM ${this.tablename} WHERE ${this.field}= $1`,
      [this.id]
    )
    this.data = await this.result.rows

    return this.data
  }
  static turnUpdateArray(fields) {
    this.fields = fields // array is expected
    this.data = this.fields
      .map((field, index) => {
        const value = `${field} = $${index + 1}`

        return value
      })
      .join(', ')
    return this.data
  }
  static turnUpdateArrayWithAND(fields) {
    this.fields = fields // array is expected
    this.data = this.fields
      .map((field, index) => {
        const value = `${field} = $${index + 1}`

        return value
      })
      .join(' AND ')
    return this.data
  }
  // update by id
  static async updateByID(table, field, fieldvalue, updatefield, updateValeu) {
    this.table = table // string
    this.field = field // turn it to string with turnUpdateArray()
    this.fieldvalue = fieldvalue // array is expected
    this.fieldvalueupdated = fieldvalue.concat(updateValeu)
    this.updatefield = updatefield // string is expected
    this.updateValeu = updateValeu // a single array is expected
    this.result = await pool.query(
      `UPDATE ${this.table} SET ${this.field} WHERE ${this.updatefield} = $${
        this.fieldvalue.length + 1
      }`,
      this.fieldvalueupdated
    )

    return this.result.rowCount
  }

  static async deleteByID(table, field, idValue) {
    this.table = table
    this.field = field
    this.idValue = idValue
    const result = await pool.query(
      `DELETE FROM ${this.table} WHERE ${this.field} = $1`,
      this.idValue
    )
    return result.rowCount
  }
}
