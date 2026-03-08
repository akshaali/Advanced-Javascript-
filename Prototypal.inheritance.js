/*
Prototypal inheritance is a fundamental concept in JavaScript that allows objects to 
inherit properties and methods from other objects. In JavaScript, every object has an internal property called [[Prototype]], 
which can reference another object. When you try to access a property or method on an object, 
JavaScript first looks for it on the object itself. If it doesn't find it there, it looks up the prototype chain 
until it finds the property or reaches the end of the chain (null).

Here's a simple example to illustrate prototypal inheritance:
*/

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect1 = new Rectangle(5, 10);
console.log(rect1.area()); // Output: 50

// In this example, the Rectangle constructor function creates objects with width and height properties. 
// The area method is defined on the Rectangle prototype, so all instances of Rectangle can access it through the prototype chain. 
// When we call rect1.area(), JavaScript looks for the area method on rect1, doesn't find it there, and then looks up the prototype chain to find it on Rectangle.prototype.

// Prototypal inheritance allows for efficient memory usage, as methods can be shared across instances without being duplicated. 
// It also enables dynamic behavior, as you can add properties and methods to the prototype at runtime, and all instances will have access to them.

function Square(side) {
  Rectangle.call(this, side, side); // Call the Rectangle constructor with the Square instance as "this"
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square; // Reset the constructor property on Square.prototype to point back to Square

const square1 = new Square(5);
console.log(square1.area()); // Output: 25

// In this example, the Square constructor function calls the Rectangle constructor to initialize the width and height properties. 
// We then set the Square prototype to be an object created from Rectangle.prototype, which allows Square instances to inherit the area method. 
// Finally, we reset the constructor property on Square.prototype to point back to Square. 
// When we create an instance of Square and call the area method, it correctly calculates the area based on the inherited properties and methods.



class Parent {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name); // Call the parent constructor to initialize the name property
        this.age = age;
    }

    displayInfo() {
        console.log(`I am ${this.name} and I am ${this.age} years old.`);
    }
}

const child1 = new Child("Alice", 10);
child1.greet(); // Output: Hello, my name is Alice
child1.displayInfo(); // Output: I am Alice and I am 10 years old.

// In this example, we have a Parent class with a constructor that initializes the name property and a greet method. The Child class extends the Parent class, inheriting its properties and methods. 
// The Child constructor calls the Parent constructor using super() to initialize the name property, and it also initializes its own age property. 
// The Child class has an additional method displayInfo that provides more information about the child. 
// When we create an instance of Child and call the greet and displayInfo methods, it demonstrates the prototypal inheritance in action.