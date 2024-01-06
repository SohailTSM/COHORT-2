const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { adminMiddleware };
