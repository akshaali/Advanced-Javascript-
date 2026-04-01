function currying(a){
    return function sum(b){
        if (b === undefined) return a;
        a +=b;
        sum.valueOf = function(){return a};
        sum.toString = function(){return a};
        return sum;
    }
}

// Method 1: Call with no args to get final value
const curriedSum1 = currying(5)(10)(15)(20)();
console.log("Method 1 - No args call:", curriedSum1);

// Method 2: Use toString() (now works with toString() method added)
const curriedSum2 = currying(5)(10)(15)(20);
console.log("Method 2 - toString():", curriedSum2.toString());

// Method 3: Use valueOf()
const curriedSum3 = currying(5)(10)(15)(20);
console.log("Method 3 - valueOf():", curriedSum3.valueOf());

// Method 4: Implicit coercion with unary +
const curriedSum4 = currying(5)(10)(15)(20);
console.log("Method 4 - Unary +:", +curriedSum4); 