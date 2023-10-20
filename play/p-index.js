const process = require('node:process');
const childProcess = require('child_process')
const fs = require('node:fs')
const readline = require("readline")

const unhandledRejections = new Map();
// process.on('unhandledRejection', (reason, promise) => {
//     console.log('reason----', reason)
//     unhandledRejections.set(promise, reason);
// });
process.on('rejectionHandled', (promise) => {
    console.log('promise----', promise)
  unhandledRejections.delete(promise);
});

// let p = new Promise((resolve, reject)=> {
//     setTimeout(() => {
//         reject('promise error')
//     }, 1000);
// })

process.on('uncaughtException', (err, origin) => {
    console.log('uncaughtException-------', err, origin)
})

// p.catch(err=> console.log('err',err))
// process.a()

// console.log(process.argv, process.argv0)
// console.log(process.config)
// console.log('connected:',process.connected)
// console.log('debugPort:',process.debugPort)

// process.emitWarning('Something happened!', {
//     code: 'MY_WARNING',
//     detail: 'This is some additional information',
//   });

// console.log('process.env', process.env)
// console.log('process.execArgv', process.execArgv)
// console.log('process.execPath', process.execPath)
// console.log('process.memoryUsage()', process.memoryUsage())


function nextTick() {
    console.log('start')
    fs.stat('./index.js',(err, stats)=> {
        console.log('err',err, 'stats', stats)
    })
    process.nextTick(() => {
        console.log('nextTick callback');
    });
    console.log('scheduled');
}

// nextTick()

function microtask() {
    Promise.resolve().then(() => console.log(2));
    queueMicrotask(() => console.log(3));
    process.nextTick(() => console.log(1));
}
// microtask()

// console.log('process.platform', process.platform)
// console.log('process.report', process.report)

function forkProcess() {
    const child = childProcess.fork('./play/child.js')
    child.on('message', (message)=> {
        console.log('Received from child process:', message);
    })
    child.send('Hello from the main process!');
}
// forkProcess()

 // index.js
//  process.stdin.on("data", data => {
//     data = data.toString().toUpperCase()
//     process.stdout.write(data + "\n")
// })


const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
})

function ask(question) {
    rl.question(question, (answer) => {
        if(answer === "q") {
            process.exit(1)
        }
        rl.write(`The answer received:  ${answer}\n`)

        ask(question)
    })
}

// ask("What is your name: ") 
rl.on('line', (input) => {
    console.log(`Received: ${input}`);
  }); 