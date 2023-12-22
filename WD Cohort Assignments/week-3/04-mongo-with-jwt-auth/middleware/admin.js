const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_PASSWORD);
    const admin = await Admin.findOne({ username: decode.username });
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({message: "Invalid token"})
  }
}

module.exports = adminMiddleware;
