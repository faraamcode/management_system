const express = require('express');
const pool = require('../db/connect');
module.exports = class Query {
 constructor(tablename, fieldname){
  this.tablename = tablename;
  this.fieldname = fieldname;
  this.altFieldName = fieldname;
  
 }
 //  turning the fileds to strings 
 turnArray(){
  this.fieldname = this.fieldname.map((item)=> item).join(", ");
 }

 // performing the query one after the other

 // select all data from the table 
 static async fetchAll(table){
  this.tablename = table
  this.result = await pool.query(`SELECT * FROM ${this.tablename}`);
 this.data = await this.result.rows
   return this.data

 }
async postAll(values){
   this.values = values
  this.result = await pool.query(`INSERT INTO ${this.tablename} (${this.fieldname}) VALUES ($1)`, this.values)
  return this.result
}
async fetchByid(id){
 this.id = id
 this.result = await pool.query(`SELECT * FROM ${this.tablename} WHERE id= $1`, [this.id])
 this.data = await this.result.rows
  
 return this.data
}
}
