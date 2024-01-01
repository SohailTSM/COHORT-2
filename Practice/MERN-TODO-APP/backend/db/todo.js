const mongoose = require('mongoose');

function connectToDB(callback) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('DB Connected');
        callback()
    })
}

module.exports = {connectToDB}