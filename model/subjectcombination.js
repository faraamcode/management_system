const pool = require('../db/connect')
const Query = require('./queryClass')

module.exports = class Subjectcomb extends Query {
  constructor(tablename, fieldname) {
    super(tablename, fieldname)
  }
  // deleting using both class_id and subject_id
  static async deleteByboth(class_id, subject_id) {
    this.class_id = class_id
    this.subject_id = subject_id
    this.result = await pool.query(
      'DELETE FROM subject_combination_tbl WHERE class_id =$1 AND subject_id = $2',
      [class_id, subject_id]
    )
    return this.result.rowCount
  }
}
