/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(seconds) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + seconds * 1000) {}
  console.log(seconds + ' seconds passed');
}

sleep(5);
