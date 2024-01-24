const express = require('express');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../db');
const { authMiddleware } = require('../middleware');

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().min(3).max(30).email(),
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
});

router.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }
  const usernameAlreadyExists = await User.findOne({ username: body.username });
  if (usernameAlreadyExists) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = new User({ ...body, password: hashedPassword });
  const savedUser = await user.save();
  const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
  res.json(200).json({
    message: 'User created successfully',
    token,
  });
});

const signinSchema = zod.object({
  username: zod.string().min(3).max(30).email(),
  password: zod.string().min(6),
});

router.post('/signin', async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: 'Error while logging in',
    });
  }
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(411).json({
      message: 'Error while logging in',
    });
  }
  const match = bcrypt.compare(body.password, user.password);
  if (!match) {
    return res.status(411).json({
      message: 'Error while logging in',
    });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).json({ token });
});

const updateSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(50).optional(),
  lastName: zod.string().max(50).optional(),
});

router.put('/', authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: 'Error while updating information',
    });
  }

  await User.findByIdAndUpdate(req.userId, body);

  res.status(200).json({
    message: 'Updated successfully',
  });
});

router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || '';
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });
  res.status(200).json({
    users: users.map(({ firstName, lastName, _id, username }) => ({
      firstName,
      lastName,
      _id,
      username,
    })),
  });
});

module.exports = router;
