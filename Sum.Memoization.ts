function memo() : (...args: number[]) => number {
  const cache = new Map<string, number>();

  return function computeSum(...args: number[]) : number {
    const key = args.join(",");
    if (cache.has(key)) {
      return cache.get(key) as number;
    }
    const result = args.reduce((sum, num) => sum + num, 0);
    cache.set(key, result);
    return result;
  };
}

let memoizedSum = memo();
const sum1 = memoizedSum(1, 2, 3); // Computes and caches the result
console.log(sum1); // Outputs: 6

const sum2 = memoizedSum(1, 2, 3); // Retrieves the result from cache
console.log(sum2); // Outputs: 6

