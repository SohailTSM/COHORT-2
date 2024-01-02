const { Router } = require('express');
const { authentication } = require('../middlewares/authentication');
const { User } = require('../db/user');

const todoRouter = Router();

todoRouter.get('/', authentication, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username });
  res.status(200).json({ todos: user.todos });
});

todoRouter.post('/', authentication, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const username = req.username;
  await User.findOneAndUpdate(
    { username },
    { $push: { todos: { title, description } } }
  );

  res.status(201).json({ message: 'Data inserted successfully' });
});

todoRouter.put('/:todoId', authentication, async (req, res) => {
  const username = req.username;
  const id = req.params.todoId;
  const user = await User.findOne({ username });
  const indexOfTodo = user.todos.findIndex((todo) => todo._id == id);
  user.todos[indexOfTodo].completed = true;
  const savedUser = await user.save();
  
  res.status(200).json({ message: 'Updated Successfully' });
});

module.exports = todoRouter;
