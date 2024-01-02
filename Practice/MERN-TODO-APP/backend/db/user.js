const mongoose = require('mongoose');

function connectToDB(callback) {
  mongoose.connect(process.env.MONGODB_URI, { dbName: 'Todo-App' }).then(() => {
    console.log('DB Connected');
    callback();
  });
}

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  todos: {
    type: [
      {
        title: String,
        description: String,
        completed: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { connectToDB, User };
