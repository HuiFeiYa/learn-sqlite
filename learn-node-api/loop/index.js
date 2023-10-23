// setTimeout(() => {
//     setImmediate(() => {
//       console.log('setImmediate');
//     });
  
//     setTimeout(() => {
//       console.log('setTimeout');
//     }, 0);
//   }, 0);
  /** 
   * setImmediate
setTimeout
   */


// setImmediate(() => {
//     setImmediate(() => {
//       console.log('setImmediate');
//     });
  
//     setTimeout(() => {
//       console.log('setTimeout');
//     }, 0);
//   }, 0);
  



// setImmediate(() => {
//     console.log('setImmediate');
//   });
//   require('fs').readFile('temp.js', () => {
//     console.log('readFile');
//   });


// function imm() {
//     setImmediate(() => {
//       console.log('setImmediate');
//       imm();
//     });
//   }
//   imm();
  
//   require('fs').readFile('temp.js', () => {
//     console.log('readFile');
//     process.exit(0);
//   });
  

// const fs = require('fs')

// // timers阶段
// const startTime = Date.now();
// setTimeout(() => {
//     const endTime = Date.now()
//     console.log(`timers: ${endTime - startTime}`)
// }, 1000)

// // poll阶段(等待新的事件出现)
// const readFileStart =  Date.now();
// fs.readFile('./Demo.txt', (err, data) => {
//     if (err) throw err
//     let endTime = Date.now()
//     // 获取文件读取的时间
//     console.log(`read time: ${endTime - readFileStart}`)
//     // 通过while循环将fs回调强制阻塞5000s
//     while(endTime - readFileStart < 5000){
//         endTime = Date.now()
//     }

// })


// // check阶段
// setImmediate(() => {
//     console.log('check阶段')
// })


// setTimeout(() => {

//     setTimeout(() => {
//         console.log('setTimeout');
//     }, 0);
//     setImmediate(() => {
//         console.log('setImmediate');
//     });

//     process.nextTick(()=> {
//         console.log('nextTick')
//     })
// }, 0);

/**
 * 示例1
 */
// const readFileStart =  Date.now();
// const baz = () => console.log('baz');
// const foo = () => console.log('foo');
// const zoo = () => console.log('zoo');
// const start = () => {
//   console.log('start');
//   require('fs').readFile('./a.db', () => {
//     let endTime = Date.now()
//     while(endTime - readFileStart < 5000){
//         endTime = Date.now()
//     }
//     console.log('readFile');
//   });
// setTimeout(() => {
//     const delay = Date.now() - readFileStart;
//     console.log('setTimeout',delay);
// }, 0);

//   setImmediate(baz);
//   new Promise((resolve, reject) => {
//     resolve('bar');
//   }).then((resolve) => {
//     console.log(resolve);
//     process.nextTick(zoo);
//   });
//   process.nextTick(foo);
// };
// start();

// start foo bar zoo baz


/**
 * 示例2
 */
const fs = require('fs');
 
function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('./Demo.txt', callback);
}
 
const timeoutScheduled = Date.now();
 
let r = setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
 
  console.log(`${delay}ms have passed since I was scheduled`);
//   clearTimeout(r)
}, 100);
 
// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  // do something that will take 10ms...
  console.log('delay',  Date.now() - timeoutScheduled)
  while ( Date.now() - timeoutScheduled < 200) {
    // do nothing
    
  }
});