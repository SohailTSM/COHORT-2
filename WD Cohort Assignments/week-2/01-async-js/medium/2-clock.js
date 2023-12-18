function clock() {
  setInterval(() => {
    let date = new Date();
    console.log(
      date.toLocaleTimeString('en-US')
    );
  }, 1000);
}

clock();
