const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate the token
const authenicateToken = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Token not found" });
  }
  
  // Verify the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying token", err);
    res.status(403).json({ message: "invalid token" });
  }
};

module.exports = authenicateToken;
