/*
Execute async tasks in parallel while respecting two rules: 
(1) A task may only start once ALL prerequisite tasks have completed. 
(2) No more than N tasks can run simultaneously.
*/

const delay = (ms, label) =>
  new Promise((r) =>
    setTimeout(() => {
      console.log(`${label} done`);
      r();
    }, ms),
  );

const taskGraph = {
  jobA: { prerequisites: [], action: () => delay(200, "jobA") },
  jobB: { prerequisites: [], action: () => delay(100, "jobB") },
  jobC: { prerequisites: [], action: () => delay(150, "jobC") },
  jobD: { prerequisites: ["jobA", "jobB"], action: () => delay(100, "jobD") },
  jobE: { prerequisites: ["jobC", "jobD"], action: () => delay(100, "jobE") },
};

/**
 * @param {Object} graph
 * @param {number} concurrencyLimit
 * @returns {Promise<void>}
 */
async function executeWithConcurrency(graph, concurrencyLimit) {
  // TODO: Implement topological sort + concurrency queue
  let inProgress = 0;
  const inDegree = new Map();
  const adjList = new Map();
  for (const [job, { prerequisites }] of Object.entries(graph)) {
    inDegree.set(job, prerequisites.length);
    for (const prereq of prerequisites) {
      if (!adjList.has(prereq)) {
        adjList.set(prereq, []);
      }
      adjList.get(prereq).push(job);
    }
  }
  const queue = [];
  for (const [job, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(job);
    }
  }
  return new Promise((resolve) => {
    function processNext() {
      if (queue.length === 0 && inProgress === 0) {
        resolve();
        return;
      }
      while (inProgress < concurrencyLimit && queue.length > 0) {
        const job = queue.shift();
        inProgress++;
        graph[job].action().then(() => {
          inProgress--;
          if (adjList.has(job)) {
            for (const dependent of adjList.get(job)) {
              inDegree.set(dependent, inDegree.get(dependent) - 1);
              if (inDegree.get(dependent) === 0) {
                queue.push(dependent);
              }
            }
          }
          processNext();
        });
      }
    }
    processNext();
  });
}

executeWithConcurrency(taskGraph, 2).then(() =>
  console.log("All jobs complete!"),
);
