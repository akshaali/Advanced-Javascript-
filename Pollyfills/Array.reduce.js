const arr = [, , 3, 4];

const value = arr.reduce((accumulator, item, index, arr) => {
  return accumulator + item;
});
console.log("native reduce value", value);

function pollyfilReduce(callbackFn, initialvalue){
  const arr = this;
  if (typeof callbackFn !== "function") {
    throw new TypeError("callback must be a function");
  }
  if (arr.length === 0 && initialvalue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let startIndex = 0;
  if (initialvalue === undefined) {
    //to handle empty slots in array
    while (startIndex < arr.length && !(startIndex in arr)) {
      startIndex++;
    }
    initialvalue = arr[startIndex];
    startIndex++;
  }

  let accumulator = initialvalue;
  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callbackFn(accumulator, arr[i], i, arr);
    }
  }
  return accumulator;
};

Array.prototype.myReduce = pollyfilReduce;
const result = arr.myReduce((accumulator, item, index, arr) => accumulator + item);

console.log("pollyfil result==>", result);
