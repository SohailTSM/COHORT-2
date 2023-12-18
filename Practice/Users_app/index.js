const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtPassword = 'asdf1234';
const app = express();

mongoose.connect(process.env.MONGODB_URI, { dbName: 'Users_app' });

const User = mongoose.model(
  'Users',
  new mongoose.Schema({
    name: String,
    username: String,
    password: String,
  })
);

async function usernameAlreadyExists(username) {
  const foundUser = await User.findOne({ username });
  return foundUser ? true : false;
}

async function userExists(username, password) {
  const foundUser = await User.findOne({ username, password });
  return foundUser ? true : false;
}

app.use(express.json());

app.post('/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!(await userExists(username, password))) {
    res.status(401).json({ msg: 'username/password is wrong' });
    return;
  }

  const token = jwt.sign({ username }, jwtPassword);
  res.status(200).json({ token });
});

app.post('/signup', async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  if (await usernameAlreadyExists(username)) {
    res.status(403).json({ msg: 'username already exists' });
    return;
  }
  const user = new User({ name, username, password });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

app.get('/users', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const users = await User.find({});
    const filterdUsers = users.filter((user) => user.username != username);
    res.status(200).json({ otherUsers: filterdUsers });
  } catch (error) {
    res.status(403).json({ msg: 'Invalid token' });
  }
});

app.listen(3000, () => console.log('Server running'));
