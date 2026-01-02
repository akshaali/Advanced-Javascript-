# Advanced JavaScript — Interview Prep (2025)

**Project**: A small collection of focused JavaScript example files and polyfills to help practice advanced language concepts commonly asked in interviews.

**Purpose**: quick-reference examples, minimal runnable snippets, and polyfills to understand core behaviors, promises, inheritance, and modern APIs.

**Repository layout**
- **`Abortcontroller.js`**: Example demonstrating use of the `AbortController` API to cancel async operations.
- **`Promise.staticfunction.js`**: Examples of built-in `Promise` static functions and their behavior.
- **`Prototypal.inheritance.js`**: Examples showing prototypal inheritance patterns in JavaScript.
- **`tempCodeRunnerFile.js`**: Temporary scratch file used while experimenting with snippets.
- **`Pollyfills/`**: Directory with polyfill implementations for array and promise helpers.
  - **`Array.flat.js`**, **`Array.map.js`**, **`Array.reduce.js`**: Small polyfills and examples for Array prototype helpers.
  - **`Promise.all.js`**, **`Promise.allsettled.js`**, **`Promise.any.js`**, **`Promise.race.js`**, **`Promise.js`**: Polyfills and simplified implementations to illustrate how these methods behave.
  - **`tempCodeRunnerFile.js`**: Scratch file inside the polyfills folder.

**How to run examples**
- Node.js (recommended): Use the installed Node.js runtime to execute any example file.

Example (zsh / macOS):
```bash
# Run a single file
node "Abortcontroller.js"

# Run all top-level .js examples in this folder
for f in *.js; do
  echo "--- Running $f ---"
  node "$f"
done
```

Notes:
- These files are intended for education and demonstration — expect some snippets to print outputs or contain small helper logs.
- If a file depends on a modern Node API, ensure you use a recent Node.js version (v14+ recommended, v16+ preferred).

Contributing / Next steps
- Add short README sections for any new examples you add.
- If you'd like, I can add a small test runner script (`run-all.js`) to import and run examples in a controlled way.

Contact / Questions
- If you want the README expanded (badges, license, more examples, or a test runner), tell me which additions you want and I will implement them.
