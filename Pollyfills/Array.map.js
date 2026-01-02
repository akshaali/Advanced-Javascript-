function mapPollyfil(callback) {
  const arr = this;
  if (!Array.isArray(arr)) {
    throw new TypeError("arr.map is not an array");
  }
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = callback(arr[i], i, arr);
    }
  }
  return result;
}

Array.prototype.myMap = mapPollyfil;

const arr = [1, 2, 3, , 4];
// const val = 1;
// val.map(12); // This will throw an error

const result = arr.myMap((num, index, array) => num * 2);
console.log("pollyfil map result==>", result);

const nativeResult = arr.map((num, index, array) => num * 2);
console.log("native map result==>", nativeResult);
