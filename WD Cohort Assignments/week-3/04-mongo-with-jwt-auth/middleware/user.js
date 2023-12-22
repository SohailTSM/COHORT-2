const jwt = require("jsonwebtoken");
const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_PASSWORD);
    const user = await User.findOne({ username: decode.username });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({message: "Invalid token"})
  }
}

module.exports = userMiddleware;