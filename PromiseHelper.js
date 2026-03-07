export const promise1 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1");
      resolve("promise1 resolved");
    }, 1000);
  });

export const promise2 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise2");
      resolve("promise2 resolved");
    }, 500);
  });

export const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("promise3");
      reject("promise3 rejected");
    }, 500);
  });

export const promise4 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise4");
      resolve("promise4 resolved");
    }, 500);
  });

export const promise5 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise5");
      resolve("promise5 resolved");
    }, 5000);
  });