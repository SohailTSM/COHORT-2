const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  description: String,
  linkedIn: String,
  twitter: String,
  github: String,
  interests: String,
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = { Profile };
