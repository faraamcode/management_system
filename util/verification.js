const jwt = require("jsonwebtoken");
exports.verifyStudentToken = (req, res, next) => {
    const token = req.body.authorization
    
    jwt.verify(token, "roemichs", (err, authData)=>{
      if (err) {
        return res.status(500).json({
          message: "error occured"
        })
      }else{
          req.token = authData
      }
      
    })
   
    next();
  }
exports.verifyTeacherToken= (req, res, next) => {
    const token = req.body.authorization
    if(!token){
      return res.status(403).json({
        message : "no token provided"
      })
    }
    jwt.verify(token, "roemichsteacher", (err, authData)=>{
      if (err) {
        return res.status(500).json({
          message: "error occured"
        })
      }
            req.token = authData
        
    })
   
    next();
  }
exports.verifyAdminToken= (req, res, next) => {
    const token = req.body.authorization
    jwt.verify(token, "roemichsadmin", (err, authData)=>{
      if (err) {
        return res.status(500).json({
          message: "error occured"
        })
      }
            req.token = authData
        
    })
   
    next();
  }
