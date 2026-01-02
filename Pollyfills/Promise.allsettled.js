import {
  promise1,
  promise2,
  promise3,
  promise4,
} from "../Promise.staticfunction.js";

Promise.myAllSettled = function (promises) {
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
          console.log(
            "Promise at index",
            index,
            "fulfilled with value:",
            value
          );
          results[index] = { status: "fulfilled", value: value };
        })
        .catch((reason) => {
          console.log(
            "Promise at index",
            index,
            "rejected with reason:",
            reason
          );
          results[index] = { status: "rejected", reason: reason };
        })
        .finally(() => {
          completedPromises += 1;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        });
    });

    // Handle the case of an empty array
    if (promises.length === 0) {
      resolve(results);
    }
  });
};

Promise.myAllSettled([promise1, promise2, promise3, promise4])
  .then((results) => {
    console.log("Promise.myAllSettled results:", results);
  })
  .catch((error) => {
    console.error("Promise.myAllSettled error:", error);
  });
