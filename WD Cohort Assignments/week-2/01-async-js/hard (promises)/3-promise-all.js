/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
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

function calculateTime() {
  let before = new Date().getTime();
  Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()]).then(
    (values) => {
      console.log(values);
      let after = new Date().getTime();
      console.log(after - before);
    }
  );
}

calculateTime();
