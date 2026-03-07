
export const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise1 settles")
    resolve("promise1");
  }, 1000);
});

export const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise2 settles")
    reject("promise2");
  }, 2000);
});

export const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise3 settles")
    resolve("promise3");
  }, 3000);
});

export const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise4 settles")
    resolve("promise4");
  }, 4000);
});