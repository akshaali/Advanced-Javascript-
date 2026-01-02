const arr = [1, , [2, [3, 4, [5]]], [6]];
console.log("native flat: ", arr.flat(1));

const pollyfilArrayFlat = (arr, depth) => {
  if (depth < 1) {
    return [...arr];
  }
  const result = [];

  const flatten = (array, currentDepth) => {
    for (let i = 0; i < array.length; i++) {
      // Skip sparse array holes
      if (!(i in array)) continue;

      const value = array[i];

      // If value is array and depth allows flattening
      if (Array.isArray(value) && currentDepth > 0) {
        flatten(value, currentDepth === Infinity ? Infinity : currentDepth - 1);
      } else {
        result.push(value);
      }
    }
  };

  flatten(arr, depth);
  return result;
};

Array.prototype.myFlat = pollyfilArrayFlat;

console.log(arr.myFlat(2));
