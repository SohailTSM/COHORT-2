const fs = require('fs');

function readFromFile() {
  fs.readFile('./easy/a.txt', 'utf-8', (err, data) => {
    console.log(data);
  });
  let a = 0;
  for (let a = 0; a < 10000000000; a++) {
    a++;
  }
  console.log('last line')
}

readFromFile()


