const fs = require('fs');

function writeToFile() {
  fs.writeFile('./easy/a.txt', 'This is new Content', 'utf-8', () => {
    console.log('Done writing file');
  });
  console.log('last line');
}

writeToFile();
