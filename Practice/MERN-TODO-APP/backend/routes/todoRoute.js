const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { User } = require("../db/user");
const { todoSchema } = require("../types/type");

const todoRouter = Router();

todoRouter.get("/", authentication, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ todos: user.todos });
});

todoRouter.post("/", authentication, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const todoValidation = todoSchema.safeParse({ title, description });
  if (!todoValidation.success) {
    let message = todoValidation.error.issues
      .map((issue) => issue.message)
      .join(" & ");
    return res.status(403).json({ message });
  }
  const username = req.username;
  const updatedUser = await User.findOneAndUpdate(
    { username },
    { $push: { todos: { title, description } } }
  );
  if (!updatedUser) {
    return res.status(500).json({ message: "Cannot insert todo" });
  }

  res.status(201).json({ message: "Data inserted successfully" });
});

todoRouter.put("/:todoId", authentication, async (req, res) => {
  const username = req.username;
  const id = req.params.todoId;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json({ message: "Internal server error" });
  }
  const indexOfTodo = user.todos.findIndex((todo) => todo._id == id);
  if (indexOfTodo == -1) {
    return res.status(404).json({ message: "No such todo" });
  }
  user.todos[indexOfTodo].completed = true;
  const savedUser = await user.save();
  if (!savedUser) {
    return res.status(500).json({ message: "Cannot update todo" });
  }

  res.status(200).json({ message: "Updated Successfully" });
});

todoRouter.delete("/:todoId", authentication, async (req, res) => {
  const username = req.username;
  const id = req.params.todoId;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json({ message: "Internal server error" });
  }
  const indexOfTodo = user.todos.findIndex((todo) => todo._id == id);
  if (indexOfTodo == -1) {
    return res.status(404).json({ message: "No such todo" });
  }
  user.todos = user.todos.filter(todo => todo._id != id)
  const savedUser = await user.save();
  if (!savedUser) {
    return res.status(500).json({ message: "Cannot delete todo" });
  }

  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = todoRouter;
