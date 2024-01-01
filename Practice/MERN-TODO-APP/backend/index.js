const express = require('express');
const todoRouter = require('./routes/todoRoute');
const { connectToDB } = require('./db/todo');
require('dotenv/config');

const app = express();

// Middlewares
app.use(express.json());
app.use('/', todoRouter);

const listen = () => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
};

connectToDB(listen);
