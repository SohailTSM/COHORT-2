const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./database/connection');
const { profileRouter } = require('./routes/profile');
const { adminRouter } = require('./routes/admin');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', adminRouter);
app.use('/', profileRouter);

connectToDB(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
