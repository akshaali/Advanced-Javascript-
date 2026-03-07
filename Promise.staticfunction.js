/*
Promises static functions are methods that are called on the Promise constructor itself

1. Promise.resolve(value):

2. Promise.reject(reason):

3. Promise.all(iterable): fails fast (return)
   
4. Promise.allSettled(iterable): never rejects (returns the error/response of promises)

5. Promise.any(iterable): If anyone of the promise resolves, if not retruned the Aggregate error

6. Promise.race(iterable): settles first

*/

import {
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
} from "./PromiseHelper.js";

Promise.all([promise1(), promise2(), promise3(), promise4(), promise5()])
  .then((res) => {
    console.log("promise.all response", res);
  })
  .catch((err) => {
    console.log("promise.all catch", err);
  });

Promise.allSettled([promise1(), promise2(), promise3(), promise4(), promise5()])
  .then((res) => {
    console.log("promise.allSettled response", res);
  })
  .catch((err) => {
    console.log("promise.allSettled catch", err);
  });

Promise.any([promise1(), promise2(), promise3(), promise4(), promise5()])
  .then((res) => {
    console.log("promise.any response", res);
  })
  .catch((err) => {
    console.log("promise.any catch", err);
  });

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()])
  .then((res) => {
    console.log("promise.race response", res);
  })
  .catch((err) => {
    console.log("promise.race catch", err);
  });
