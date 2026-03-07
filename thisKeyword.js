/*
Understanding the "this" Keyword in JavaScript

In JavaScript, the "this" keyword refers to the object that is currently executing the code. 
The value of "this" can change depending on how a function is called. 
Here are some common scenarios:

1. Global Context: When "this" is used in the global context (outside of any function), 
it refers to the global object (window in browsers).

2. Object Method: When "this" is used inside a method of an object, it refers to the object itself.

3. Constructor Function: When "this" is used inside a constructor function, 
it refers to the instance of the object being created.

4. Event Handlers: When "this" is used inside an event handler, 
it refers to the element that triggered the event.

5. Arrow Functions: Arrow functions do not have their own "this" context; 
instead, they inherit "this" from the surrounding scope.

Understanding how "this" works is crucial for writing effective JavaScript code and 
avoiding common pitfalls related to context and scope.
*/

console.log(this); // In global context, this refers to the global object (window in browsers)

//object itself does NOT determine this. It depends on how the function defines this.
const obj = {
  name: "Aksha",

  classic: function () {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this.name);
  },
};

obj.classic(); // "Aksha"
obj.arrow(); // undefined

const callFunc = obj.classic
callFunc(); // undefined, because "this" refers to the global object, not the object itself. In strict mode, it would be undefined instead of the global object.

const arrowFunc2 = obj.arrow
arrowFunc2(); // undefined, because arrow functions do not have their own "this" context and inherit it from the surrounding scope, which is the global object in this case (window in browsers).

obj.arrow.call(obj); // call, apply, and bind cannot change this of arrow functions because arrow functions capture this lexically from their defining scope.

function greet() {
  console.log(this); // In a regular function, "this" refers to the global object (window in browsers)
}
greet();

const arrowFunc = () => {
  console.log(this); // In an arrow function, "this" refers to the surrounding scope, which is the global object in this case (window in browsers)  
};
arrowFunc();
