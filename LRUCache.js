/*
Design a caching system for an autocomplete feature using a Least Recently Used (LRU) eviction policy. Minimize repetitive API calls by storing recent search queries. 
When full, remove the least recently accessed item before adding a new one.
*/

class SearchSuggestionCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.map = new Map();
    this.set = new Set();
    // TODO: Initialize your cache data structure here
  }

  async getResults(searchTerm) {
    // TODO: Implement LRU logic
    // 1. Check if searchTerm is in the cache.
    // 2. Cache HIT  → update recentness, return cached result.
    // 3. Cache MISS → fetch, store (evict LRU if full), return result.
    if(this.map.has(searchTerm)) {
      const result = this.map.get(searchTerm);
      // Move to end to show that it was recently used
      this.map.delete(searchTerm);
      this.map.set(searchTerm, result);
      return result;
    } else {
      const result = await this.fetchFromDatabase(searchTerm);
      if(this.map.size >= this.maxSize) {
        // Evict least recently used (first item in the Map)
        /**
         * Gets the least recently used (LRU) key from the map.
         * Retrieves the first key in the map's insertion order, which represents
         * the least recently used item in the LRU cache.
         * @type {*}
         */
        const lruKey = this.map.keys().next().value;
        this.map.delete(lruKey);
      }
      this.map.set(searchTerm, result);
      return result;
    }
  }

  // Mock API — simulates 500ms network latency
  async fetchFromDatabase(searchTerm) {
    return new Promise(resolve =>
      setTimeout(() => resolve(`Results for: ${searchTerm}`), 500)
    );
  }
}

// Smoke test
async function test() {
  const cache = new SearchSuggestionCache(3);
  console.log(await cache.getResults('react'));   // miss
  console.log(await cache.getResults('vue'));     // miss
  console.log(await cache.getResults('react'));   // should be a hit
  console.log(await cache.getResults('angular')); // miss
  console.log(await cache.getResults('svelte'));  // miss — should evict LRU
}
test();