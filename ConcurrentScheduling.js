const promise1 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1");
      resolve("promise1 resolved");
    }, 1000);
  });

const promise2 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise2");
      resolve("promise2 resolved");
    }, 500);
  });

const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("promise3");
      reject("promise3 rejected");
    }, 500);
  });

const promise4 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise4");
      resolve("promise4 resolved");
    }, 500);
  });

const promise5 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise5");
      resolve("promise5 resolved");
    }, 500);
  });

async function concurrentScheduling(tasks, batchSize) {
  const results = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize).map((task) => task());
    try {
      const batchResults = await Promise.all(
        batch.map((p) => p.catch((error) => ({ error }))),
      );
      results.push(...batchResults);
    } catch (error) {
      console.error("Error in batch:", error);
    }
  }
  return results;
}

const tasks = [promise1, promise2, promise3, promise4, promise5];
const batchSize = 2;
console.log("Starting concurrent scheduling...");
concurrentScheduling(tasks, batchSize)
  .then((results) => {
    console.log("All tasks completed. Results:", results);
  })
  .catch((error) => {
    console.error("Error in concurrent scheduling:", error);
  });
