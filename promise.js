const promise = new Promise((norm, neNorm) => {
  setTimeout(() => {
    norm("Vse normalno")
  }, 3000);
});

promise
  .then((message) => {
    return message + " это полюбас";
  })
  .then((message) => {
    console.log(message + " и однозначно");
  })
  .catch(() => {
    console.log("Всё хуева");
  })
  .finally(() => {
    console.log("Ну это полюбас");
  });
