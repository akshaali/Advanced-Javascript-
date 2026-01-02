const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchOptions = { ...options, signal };

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const response = await fetch(url, fetchOptions);
        const result = await response.json();
        console.log('Fetch completed before timeout', result);
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Fetch request timed out');
        }
        throw error;
    }
};

// Example usage:
fetchWithTimeout('https://jsonplaceholder.typicode.com/todos', {}, 3000)
    .then(response => console.log('Response received:', response))
    .catch(error => console.error('Error:', error));