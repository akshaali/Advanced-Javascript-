import { promise1, promise2, promise3, promise4 } from "../PromiseHelper.js";

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument is not iterable"));
    }

    promises.forEach((promise, index) => {
      console.log("Processing promise at index:", index);
      Promise.resolve(promise)
        .then((value) => {
          console.log(
            "Promise at index",
            index,
            "fulfilled with value:",
            value,
          );
          resolve(value);
        })
        .catch((reason) => {
          console.log(
            "Promise at index",
            index,
            "rejected with reason:",
            reason,
          );
          reject(reason);
        });
    });

    // Handle the case of an empty array
    if (promises.length === 0) {
      resolve(results);
    }
  });
};

Promise.myRace([promise1, promise2, promise3, promise4])
  .then((results) => {
    console.log("Promise.myRace results:", results);
  })
  .catch((error) => {
    console.error("Promise.myRace error:", error);
  });
