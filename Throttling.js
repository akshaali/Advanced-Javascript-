/*
Defination: Throttling is a performance optimization technique that 
limits the number of times a function can be called over a specified period. 
It ensures that a function is not called more frequently than a certain rate, 
which can help improve performance and reduce resource consumption in scenarios such as scrolling, 
resizing, or handling user input events.
*/

function throttling(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else return;
  };
}

//Example usage:
function logMessage(a) {
  console.log(
    "Throttled function called at",
    new Date().toLocaleTimeString(),
    a,
  );
}

const throttledLogMessage = throttling(() => logMessage("Hello World!"), 2000);

// Simulating rapid calls to the throttled function
setInterval(throttledLogMessage, 500); // This will call the function every 500ms, but it will only execute every 2000ms due to throttling.
