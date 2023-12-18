const express = require('express');
const app = express();

let average = [0, 0];
let initialTime = 0;

function noteInitialTime(req, res, next) {
  initialTime = new Date().getTime();
  next();
}

app.get(
  '/',
  noteInitialTime,
  (req, res, next) => {
    res.status(200).json({ msg: 'Hey there!' });
    next();
  },
  (req, res) => {
    let finalTime = new Date().getTime();
    average[0] += finalTime - initialTime;
    average[1]++;
    console.log(average);
    console.log('Average - ' + average[0] / average[1]);
  }
);

app.listen(3000, () => console.log('Server running'));
