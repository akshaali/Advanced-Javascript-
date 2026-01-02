import {
  promise1,
  promise2,
  promise3,
  promise4,
} from "../Promise.staticfunction.js";

const PromiseAllPolllyfill = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument is not iterable"));
    }

    const results = [];
    let completedPromises = 0;

    promises.forEach((promise, index) => {
      console.log("Processing promise at index:", index);
      Promise.resolve(promise)
        .then((value) => {
          console.log("Promise at index", index, "resolved with value:", value);
          results[index] = value;
          completedPromises += 1;

          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

    // Handle the case of an empty array
    if (promises.length === 0) {
      resolve(results);
    }
  });
};

Promise.myAll = PromiseAllPolllyfill;

Promise.myAll([promise1, promise2, promise3, promise4])
  .then((results) => {
    console.log("Promise.myAll results:", results); // [1, 2, 3]
  })
  .catch((error) => {
    console.error("Promise.myAll error:", error);
  });
