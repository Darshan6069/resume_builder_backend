const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  var authToken = req.headers.authorization;
    console.log(req.header);
  jwt.verify(authToken, "secret-key",(err,payload)=>{
if(err){
     res.status(401).json({ success: false, data: "Token is not Valid!" });
    } else {
      next();
    }
  });
};
module.exports = { verifyToken };