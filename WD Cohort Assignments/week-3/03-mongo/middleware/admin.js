const { Admin } = require('../db/index');

async function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    res.status(403).json({ message: 'Invalid username/password' });
    return;
  }
  next();
}

module.exports = adminMiddleware;
