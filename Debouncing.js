/*
Defination: Debouncing is a performance optimization technique that 
limits the rate at which a function can be called. 
It ensures that a function is only called after a certain amount of time has passed 
since the last time it was invoked. 
This can be useful for handling events that fire frequently, 
such as window resizing or input events.
*/

function debouncing(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//Example usage:
function logMessage(a) {
  console.log(
    "Debounced function called at",
    new Date().toLocaleTimeString(),
    a,
  );
}

const debouncedLogMessage = debouncing(() => logMessage("Hello World!"), 2000);

// Simulating rapid calls to the debounced function
// setInterval(debouncedLogMessage, 500); // This will call the function every 500ms, but it will only execute once after 2000ms of inactivity due to debouncing.


// Simulate rapid calls
debouncedLogMessage();
debouncedLogMessage();
debouncedLogMessage(); // Only this one executes after 300ms