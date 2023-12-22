const mongoose = require("mongoose");
require("dotenv/config");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "Udemy" })
  .then((data) => console.log("DB Connected"));

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: { type: [{ type: String }], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: { type: Boolean, default: true },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
