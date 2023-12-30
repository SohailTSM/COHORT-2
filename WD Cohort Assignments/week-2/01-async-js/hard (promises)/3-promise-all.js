/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

async function wait(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
}

async function calculateTime(t1, t2, t3) {
  let before = new Date().getTime();
  return new Promise((resolve, reject) => {
    Promise.all([wait(t1), wait(t2), wait(t3)]).then((values) => {
      let after = new Date().getTime();
      // console.log(after - before);
      resolve(after - before);
    });
  });
}


module.exports = calculateTime;
