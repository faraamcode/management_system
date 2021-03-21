const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
    const token = req.body.authorization
    jwt.verify(token, "roemichs", (err, authData)=>{
      if (err) {
        return res.status(500).json({
          message: "error occured"
        })
      }else if(authData.user.role !=="student"){
          return res.status(402).json({
            message: "You are not a student"
          })
        }else{
            req.token = authData
        }
      
    })
   
    next();
  }