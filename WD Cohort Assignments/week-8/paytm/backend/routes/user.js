const express = require('express');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User, Account } = require('../db');
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
  const account = new Account({
    userId: savedUser._id,
    balance: Math.ceil(Math.random() * 10000),
  });
  await account.save();
  const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
  const { firstName, lastName, _id, username } = savedUser;
  return res.status(200).json({
    message: 'User created successfully',
    token,
    user: { firstName, lastName, _id, username },
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
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    return res.status(411).json({
      message: 'Error while logging in',
    });
  }
  const { firstName, lastName, _id, username } = user;
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).json({ token, user: { firstName, lastName, _id, username } });
});

const updateSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(50).optional(),
  lastName: zod.string().max(50).optional(),
});

router.put('/', authMiddleware, async (req, res) => {
  const body = req.body;
  console.log(body);
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: 'Error while updating information',
    });
  }
  if (body.password) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  }

  await User.findByIdAndUpdate(req.userId, body);

  res.status(200).json({
    message: 'Updated successfully',
  });
});

router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || '';
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } },
    ],
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

router.get('/myself', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  const { firstName, lastName, _id, username } = user;
  res.status(200).json({ firstName, lastName, _id, username });
});

module.exports = router;
