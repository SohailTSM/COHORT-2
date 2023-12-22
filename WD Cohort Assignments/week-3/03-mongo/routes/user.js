const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

const usernameExists = async (username) => {
  const foundUser = await User.findOne({ username });
  return foundUser ? true : false;
};

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (await usernameExists(username)) {
    res.status(403).json({ message: "username already exists" });
    return;
  }
  const user = new User({ username, password });
  const savedUser = await user.save();
  res.status(201).json({ message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  if (!courses) {
    res.status(404).json({ message: "No course found" });
    return;
  }
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "No such course" });
  }
  const user = req.user;
  if (user.purchasedCourses.includes(courseId)) {
    return res.status(409).json({ message: "Course already exist" });
  }
  user.purchasedCourses.push(courseId);
  try {
    const savedUser = await user.save();
    res.status(201).json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = req.user;
  const purchasedCourses = await Course.find({
    _id: { $in: user.purchasedCourses },
  });

  if (purchasedCourses.length < 1) {
    res.status(404).json({ message: "No course purchased" });
    return;
  }
  res.status(200).json({ purchasedCourses });
});

module.exports = router;
