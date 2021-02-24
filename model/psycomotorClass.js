const pool = require('../db/connect')
const Query = require('./queryClass')
module.exports = class Psycomotor extends Query{
    constructor(tablename, fieldname) {
        super(tablename, fieldname)
      }
    //  deleting with multiple parameters
    static async DeleteWithMultiple(table, fields, fieldvalue){
     this.table = table 
     this.fields = fields
     this.fieldvalue = fieldvalue
     this.result = await pool.query(`DELETE FROM ${this.table} WHERE ${this.fields}`, this.fieldvalue)
     return this.result.rowCount
    } 
}