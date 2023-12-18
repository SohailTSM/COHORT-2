/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, 'One');
  });
}

function waitTwoSecond() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, 'Two');
  });
}

function waitThreeSecond() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000, 'Three');
  });
}

async function calculateTime() {
  let before = new Date().getTime();
  let one = await waitOneSecond();
  let two = await waitTwoSecond();
  let three = await waitThreeSecond();
  let after = new Date().getTime();
  console.log(after - before);
}

calculateTime()