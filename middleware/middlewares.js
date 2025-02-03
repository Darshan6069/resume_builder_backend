const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ success: false, msg: "No token provided." });
  }

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to authenticate token." });
    }

    // If everything is good, save the decoded token to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
