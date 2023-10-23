const {EventEmitter, errorMonitor} = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// Prints: 1
myEmitter.emit('event');
// Prints: 2


// myEmitter.on('error', (err) => {
//     console.error('whoops! there was an error');
//   });
//   myEmitter.emit('error', new Error('whoops!'));
  // Prints: whoops! there was an error


// myEmitter.once('newListener', (event, listener)=> {
//     console.log('--',event, listener)
// })

myEmitter.on('event', (...args) => {
console.log('A',args);
});
  myEmitter.emit('event',1,2);


// const clickHandler = (e) => {
//     console.log(e)
// }
// myEmitter.on('click', clickHandler)
// /** 执行顺序插在 click 事件队列前面 */
// myEmitter.prependListener('click', (e)=> {
//     console.log('prependListener')
//     clickHandler(e)
// })
// myEmitter.on('click', (e)=> {
//     console.log('second')
//     clickHandler(e)
// })

// myEmitter.emit('click',[1,2])

// /**
//  * emitter.rawListeners(eventName)
//  * 返回名为 eventName 的事件的监听器数组的副本，包括任何封装器（例如由 .once() 创建的封装器）。
//  */
// const listeners = myEmitter.rawListeners('click')
// console.log('listeners', listeners)