/*
Promises static functions are methods that are called on the Promise constructor itself

1. Promise.resolve(value):

2. Promise.reject(reason):

3. Promise.all(iterable): fails fast (return)
   
4. Promise.allSettled(iterable): never rejects (returns the error/response of promises)

5. Promise.any(iterable): If anyone of the promise resolves, if not retruned the Aggregate error

6. Promise.race(iterable): settles first

*/

export const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise1 settles")
    reject("promise1");
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
    reject("promise3");
  }, 3000);
});

export const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise4 settles")
    reject("promise4");
  }, 4000);
});

Promise.all([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log("promise.all response", res);
  })
  .catch((err) => {
    console.log("promise.all catch", err);
  });

Promise.allSettled([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log("promise.allSettled response", res);
  })
  .catch((err) => {
    console.log("promise.allSettled catch", err);
  });

Promise.any([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log("promise.any response", res);
  })
  .catch((err) => {
    console.log("promise.any catch", err);
  });

  Promise.race([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log("promise.race response", res);
  })
  .catch((err) => {
    console.log("promise.race catch", err);
  });