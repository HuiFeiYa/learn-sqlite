const process = require('node:process');
process.on('message', (message) => {
    console.log('Received from main process:', message);
    process.send('Hello from the child process!');
});
