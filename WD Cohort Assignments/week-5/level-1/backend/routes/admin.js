const adminRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminSchema } = require('../types/adminType');
const { Admin } = require('../database/adminModel');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

adminRouter.post('/create', async (req, res) => {
  if (req.headers.secret != process.env.CREATE_ADMIN_SECRET) {
    return res
      .status(401)
      .json({ message: 'You are not authorized to create admin' });
  }
  const username = req.body.username;
  const password = req.body.password;
  const adminValidation = adminSchema.safeParse({ username, password });
  if (!adminValidation.success) {
    let message = adminValidation.error.issues
      .map((issue) => issue.message)
      .join(' & ');
    return res.status(403).json({ message });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
  res.status(201).json({ message: 'Admin created successfully' });
});

adminRouter.post('/signin', async (req, res) => {
  let message = 'Invalid username or password';
  const username = req.body.username;
  const password = req.body.password;
  const adminValidation = adminSchema.safeParse({ username, password });
  if (!adminValidation.success) {
    return res.status(401).json({ message });
  }
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message });
  }
  const passwordMatch = bcrypt.compareSync(password, admin.password);
  if (!passwordMatch) {
    return res.status(401).json({ message });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

adminRouter.get('/', adminMiddleware, (req, res) => {});

module.exports = { adminRouter };
