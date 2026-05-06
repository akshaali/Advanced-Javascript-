function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      flattenObject(val, path, result);
    } else {
      result[path] = val;
    }
  }
  return result;
}

const nested = { a: { b: { c: 1, d: 10 }, e: 20 }, d: [1, 2, {a: {d: 10}}], e: null };
console.log(JSON.stringify(flattenObject(nested), null, 2));
// { 'a.b.c': 1, 'd': [1,2], 'e': null }


function flatenObjectWithArray(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object') {
      flatenObjectWithArray(val, path, result);
    } else {
      result[path] = val;
    }
  }
  return result;
}

console.log(Object.keys([1, 2, {a: {d: 10}}]))

console.log(JSON.stringify(flatenObjectWithArray(nested), null, 2));
// { 'a.b.c': 1, 'a.b.d': 10, 'a.e': 20, 'd.0': 1, 'd.1': 2, 'd.2.a.d': 10, 'e': null }


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('start');
  await delay(1000);
  console.log('1 second later');
}

run();


async function fetchWithRetry(url, options = {}, retries = 3, baseDelay = 500) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries - 1) throw err;
      const wait = Math.pow(2, attempt) * baseDelay;
      console.log(`Retry ${attempt + 1} in ${wait}ms…`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
}

// Test with a failing mock
async function mockFetch() { throw new Error('Network error'); }
console.log('Testing retry (will exhaust 3 attempts)…');
fetchWithRetry('https://example.com').catch(e => console.log('Final error:', e.message));