class MyPromise {
  constructor(executor) {
    this.state = "PENDING";
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "PENDING") return;
      console.log("Resolving with value:", value);
      this.state = "FULFILLED";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    };

    const reject = (reason) => {
      if (this.state !== "PENDING") return;
      console.log("rejecting with value:", reason);
      this.state = "REJECTED";
      this.value = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    };

    try {
      console.log("Executing promise executor");
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  handler(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      console.log("Handler called with state:", this.state);
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            resolve(onFulfilled(value));
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            resolve(onRejected(reason));
          } else {
            reject(reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "FULFILLED") {
        console.log("Handling fulfilled state");
        queueMicrotask(() => handleFulfilled(this.value));
      }

      if (this.state === "REJECTED") {
        console.log("Handling rejected state");
        queueMicrotask(() => handleRejected(this.value));
      }

      if (this.state === "PENDING") {
        console.log("Promise is still pending, storing callbacks");
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  then(onFulfilled) {
    console.log("then method called");
    return this.handler(onFulfilled, null);
  }
  catch(onRejected) {
    console.log("catch method called");
    return this.handler(null, onRejected);
  }
  finally(callback) {
    console.log("finally method called");
    return this.handler(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }
}

const myPromiseExample = new MyPromise((resolve, reject) => {
  console.log("MyPromise executor running...");
  setTimeout(() => {
    resolve("MyPromise resolved!");
  }, 1000);
});

myPromiseExample
  .then((message) => {
    console.log("MyPromise resolved:", message);
    return message + " Chained!";
  })
  .catch((error) => {
    console.error("MyPromise rejected:", error);
  })
  .finally((value) => {
    console.log("MyPromise settled.", value);
  });
