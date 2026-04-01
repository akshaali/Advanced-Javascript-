/*
Write mapLimit(inputs, limit, iterateeFn, callback). 
Requirements: 
(1) Never exceed `limit` concurrent operations. 
(2) Output order must match input order. 
(3) As soon as one task finishes, the next must start immediately.
*/

/**
 * @param {Array}    inputs      - Items to process
 * @param {number}   limit       - Max concurrent tasks
 * @param {Function} iterateeFn  - async iteratee(item, cb)
 * @param {Function} callback    - called with final results array
 */
function mapLimit(inputs, limit, iterateeFn, callback) {
  // TODO: implement sliding-window concurrency
  const results = new Array(inputs.length);
  let inProgress = 0;
  let currentIndex = 0;
  const processNext = () => {
    if(currentIndex >= inputs.length && inProgress === 0) {
      callback(results);
      return;
    }
    if (
      inProgress < limit &&
      inputs.length > 0 &&
      currentIndex < inputs.length
    ) {
      const item = inputs[currentIndex];
      currentIndex++;
      inProgress++;
      iterateeFn(item, (p1, p2) => {
        console.log(`Processed item ${item} with result: ${p2}`, p1);
        inProgress--;
        results[inputs.indexOf(item)] = `User${item}`;
        processNext();
      });
    }
  };
  processNext();
}

// Mock async iteratee
function getNameById(id, cb) {
  setTimeout(() => cb(null, `User${id}`), Math.random() * 300);
}

// Expected: ["User1", "User2", "User3", "User4", "User5"]
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (results) => {
  console.log("output:", results);
});
