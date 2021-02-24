const pool = require('../db/connect')
const { turnUpdateArrayWithAND, turnUpdateArrayWithANDWithStartIndex } = require('./queryClass')
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
    static async UpdateWithMultiple(table, updatefield, clausefield, fieldvalues){
        this.table = table 
        this.updatefield = Query.turnUpdateArray(updatefield)
        this.clausefield = Query.turnUpdateArrayWithANDWithStartIndex(clausefield, updatefield.length)
        this.fieldvalue = fieldvalues
        this.result = await pool.query(`UPDATE ${this.table} SET ${this.updatefield} WHERE ${this.clausefield}`, this.fieldvalue)
        return this.result.rowCount
    }
}