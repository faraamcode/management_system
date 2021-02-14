const Pool = require('pg').Pool;
const db = require('../secret/data')
const {user, password, host, database} = db.database
const pool = new Pool({
  user,
 password,
 host,
 database
})

module.exports = pool;