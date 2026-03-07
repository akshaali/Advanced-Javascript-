import {
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
} from "../PromiseHelper.js";

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
