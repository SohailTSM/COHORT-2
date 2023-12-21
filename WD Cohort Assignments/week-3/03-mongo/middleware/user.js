const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const user = await User.findOne({ username, password });
  if (!user) {
    res.status(403).json({ message: 'Invalid username/password' });
    return;
  }
  req.user = user;
  next();
}

module.exports = userMiddleware;
