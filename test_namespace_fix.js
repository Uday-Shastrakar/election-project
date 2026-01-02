const https = require('https');

// The user provided dashboard link: https://app.counterapi.dev/team/uday-shastrakars-team/user-tokens/1793
// The code snippet had: uday-shastrakar-s-workspace
// Let's test the dashboard link's workspace name: uday-shastrakars-team

const namespace = 'uday-shastrakars-team';
const counterName = 'first-counter-2347';
const apiKey = 'ut_nYt9XGyZDpO0TDjG7T3l0dMGh2rSrozpzaT5Nv4T'; // Inserted user-provided token
const baseUrl = `https://api.counterapi.dev/v2/${namespace}/${counterName}`;

// Function to perform GET request with Authorization header
function getRequest(path, callback) {
    const options = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    };
    https.get(`${baseUrl}${path}`, options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => callback(res.statusCode, data));
    }).on('error', (e) => console.error('Error:', e));
}

// Increment Counter (Up)
function incrementCounter() {
    getRequest('/up', (status, data) => {
        console.log('Increment Status:', status);
        try { console.log('Response:', JSON.parse(data)); } catch { console.log('Raw:', data); }
    });
}

// Decrement Counter (Down)
function decrementCounter() {
    getRequest('/down', (status, data) => {
        console.log('Decrement Status:', status);
        try { console.log('Response:', JSON.parse(data)); } catch { console.log('Raw:', data); }
    });
}

// Get Counter Value
function getCounterValue() {
    getRequest('', (status, data) => {
        console.log('Get Value Status:', status);
        try { console.log('Value:', JSON.parse(data)); } catch { console.log('Raw:', data); }
    });
}

// Get Counter Statistics
function getCounterStats() {
    getRequest('/stats', (status, data) => {
        console.log('Stats Status:', status);
        try { console.log('Stats:', JSON.parse(data)); } catch { console.log('Raw:', data); }
    });
}

// Example usage:
incrementCounter();
// decrementCounter();
// getCounterValue();
// getCounterStats();
