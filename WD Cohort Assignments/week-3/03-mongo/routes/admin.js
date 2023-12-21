const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const router = Router();

const usernameExists = async (username) => {
  const foundAdmin = await Admin.findOne({ username });
  return foundAdmin ? true : false;
};

// Admin Routes
router.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (await usernameExists(username)) {
    res.status(403).json({ message: 'username already exists' });
    return;
  }
  const admin = new Admin({ username, password });
  const savedAdmin = await admin.save();
  res.status(201).json({ message: 'Admin created successfully' });
});

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const course = new Course({ title, description, price, imageLink });
  try {
    const savedCourse = await course.save();
    res.status(201).json({
      message: 'Course created successfully',
      courseId: savedCourse._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error in creating ' });
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  if (!courses) {
    res.status(404).json({ message: 'No course found' });
    return;
  }
  res.status(200).json({ courses });
});

module.exports = router;
