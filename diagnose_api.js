const https = require('https');

const tests = [
    { name: 'Original snippet', url: 'https://api.counterapi.dev/v1/uday-shastrakar-s-workspace/first-counter-2347/increment' },
    { name: 'Corrected Namespace', url: 'https://api.counterapi.dev/v1/uday-shastrakars-team/first-counter-2347/increment' },
    { name: 'Corrected Namespace + Simple Counter Name', url: 'https://api.counterapi.dev/v1/uday-shastrakars-team/counter/increment' },
    { name: 'Corrected Namespace + Website', url: 'https://api.counterapi.dev/v1/uday-shastrakars-team/website/increment' }
];

function testUrl(test) {
    return new Promise((resolve) => {
        console.log(`Testing: ${test.name} -> ${test.url}`);
        const req = https.get(test.url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`[${res.statusCode}] Response for ${test.name}: ${data}`);
                resolve();
            });
        });
        req.on('error', (e) => {
            console.error(`Error testing ${test.name}: ${e.message}`);
            resolve();
        });
    });
}

async function runTests() {
    for (const test of tests) {
        await testUrl(test);
    }
}

runTests();
