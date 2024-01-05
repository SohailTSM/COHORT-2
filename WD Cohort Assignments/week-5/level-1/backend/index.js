const express = require('express');
const { connectToDB } = require('./database/connection');
const { profileRouter } = require('./routes/profile');
const { adminRouter } = require('./routes/admin');
require('dotenv/config');

const app = express();

app.use(express.json());
app.use('/', profileRouter);
app.use('/admin', adminRouter);

connectToDB(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
