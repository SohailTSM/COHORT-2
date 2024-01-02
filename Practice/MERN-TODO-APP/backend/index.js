const express = require('express');
const todoRouter = require('./routes/todoRoute');
const { connectToDB } = require('./db/user');
const authRouter = require('./routes/authRoute');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', todoRouter);
app.use('/auth', authRouter);

const listen = () => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
};

connectToDB(listen);
