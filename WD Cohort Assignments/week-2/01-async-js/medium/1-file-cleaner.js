const fs = require('fs');

function readFile() {
  return new Promise((resolve) => {
    fs.readFile('./medium/a.txt', 'utf-8', (err, data) => {
      resolve(data);
    });
  });
}

function writeFile(str) {
  fs.writeFile('./medium/a.txt', str, 'utf-8', () => {
    console.log('Done writing file');
  });
}

function clean(str) {
  let cleanStr = str
    .split(' ')
    .filter((i) => {
      return true ? i : false;
    })
    .join(' ');
  return cleanStr;
}

async function main() {
  let str = await readFile();
  newStr = clean(str);
  writeFile(newStr);
}

main();
