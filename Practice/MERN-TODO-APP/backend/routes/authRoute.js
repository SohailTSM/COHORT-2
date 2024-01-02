const { Router } = require("express");
const { User } = require("../db/user");
const { userSchema } = require("../types/type");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userValidation = userSchema.safeParse({ username, password });
  if (!userValidation.success) {
    let message = userValidation.error.issues
      .map((issue) => issue.message)
      .join(" & ");
    return res.status(403).json({ message });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  const savedUser = await user.save();
  if (!savedUser) {
    return res.status(500).json({ message: "Internal server error" });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

authRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(403).json({ message: "Invalid username or password" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

module.exports = authRouter;
