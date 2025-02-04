// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token)
//     return res
//       .status(401)
//       .json({ success: false, msg: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).json({ success: false, msg: "Invalid token." });
//   }
// };

// module.exports = { verifyToken };

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ success: false, msg: "Invalid token." });
  }
};

module.exports = { verifyToken };
