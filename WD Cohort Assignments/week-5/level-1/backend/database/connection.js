const mongoose = require('mongoose');

function connectToDB(callback) {
  mongoose.connect(process.env.MONGODB_URI, { dbName: 'Profile' }).then(() => {
    console.log('Connected to DB');
    callback();
  });
}

module.exports = { connectToDB };
