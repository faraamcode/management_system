const express = require("express");
const router = express.Router();
router.get('/student',
(req, res, next)=>{
 res.send({
  "status": "success"
 })
})
module.exports =  router;