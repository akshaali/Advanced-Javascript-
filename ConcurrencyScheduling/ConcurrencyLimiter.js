import {
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
} from "../PromiseHelper.js";

class CurrencyLimiter {
  constructor(limit) {
    this.limit = limit;
    this.activeCount = 0;
    this.queue = [];
    this.results = [];
  }

  async execute(task) {
    try {
      this.activeCount++;
      const result = await task();
      this.results.push(result);
    } catch (error) {
      console.error("Error occurred while executing task:", error);
    } finally {
      this.activeCount--;
      if (this.queue.length > 0) {
        const nextTask = this.queue.shift();
        this.execute(nextTask);
      }
    }
  }

  push(task) {
    if (this.activeCount < this.limit) {
      this.execute(task);
    } else {
      this.queue.push(task);
    }
  }
}

const tasks = [promise1, promise2, promise3, promise4, promise5];

const currencyLimiter = new CurrencyLimiter(2);

function runTasks(tasks) {
  tasks.forEach((task) => {
    currencyLimiter.push(task);
  });
}

runTasks(tasks);
