import {
  promise1,
  promise2,
  promise3,
  promise4,
} from "../Promise.staticfunction.js";

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument is not iterable"));
    }

    const errors = [];
    let rejectedPromises = 0;

    promises.forEach((promise, index) => {
      console.log("Processing promise at index:", index);
      Promise.resolve(promise)
        .then((value) => {
          console.log(
            "Promise at index",
            index,
            "fulfilled with value:",
            value
          );
          resolve(value); // Resolve as soon as one promise fulfills
        })
        .catch((reason) => {
          console.log(
            "Promise at index",
            index,
            "rejected with reason:",
            reason
          );
          errors[index] = reason;
          rejectedPromises += 1;
          if (rejectedPromises === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });

    // Handle the case of an empty array
    if (promises.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
    }
  });
};

Promise.myAny([promise1, promise2, promise3, promise4])
  .then((value) => {
    console.log("Promise.myAny fulfilled with value:", value);
  })
  .catch((error) => {
    console.error("Promise.myAny rejected with error:", error);
  });

