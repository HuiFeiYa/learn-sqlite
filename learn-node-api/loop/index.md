## 事件循环打印
1. 执行同步代码，打印 start
2. 判断是否有已经到期的 timer （timer 阶段检查到期回调）
3. 异步 I/O 操作，例如网络请求、文件读取等。在 I/O 阶段，当这些 I/O 操作完成后，对应的回调函数将会被添加到任务队列中，等待执行(I/O callback phase)
    * 在 I/O 阶段中，Node.js 可能会将相关的 I/O 操作交给操作系统来处理，等待操作系统的响应。因此，在 I/O 阶段中，Node.js 实际上是在等待操作系统的通知，而不是主动进行处理。
4. （poll（轮询）阶段）
    * 如果 poll 队列不空，event loop会遍历队列并同步执行回调，直到队列清空或执行的回调数到达系统上限；
    * 如果 poll 队列为空，则发生以下两件事之一：
        * 如果代码已经被setImmediate()设定了回调, event loop将结束 poll 阶段进入 check 阶段来执行 check 队列（里面的回调 callback）。
    * 如果代码没有被setImmediate()设定回调，event loop将阻塞在该阶段等待回调被加入 poll 队列，并立即执行。
5. check阶段：setImmediate() 回调在此处被调用。
6. close callbacks：一些关闭的回调函数，如：socket.on('close', ...)。



## process.nextTick, 微任务
process.nextTick() 并不属于事件循环内的概念。process.nextTick() 任务 队列 是由 Node.js 管理的，而微任务的任务队列则直接由 V8 提供。

两者都是在本次事件循环中执行。

## 输出结果
* 示例1
```js
start //同步代码  
foo // 本次 tick
bar // 微任务 本次tick，后于 nextTick
zoo // 微任务中设置了 tick 
setTimeout // 宏任务
baz // 下一次事件循环 setImmediate
readFile // io 回调
```

* 示例2

```js
// delay 2
// 200ms have passed since I was scheduled
```
1. 执行 setTimeout，函数回调预期在 100ms 时被执行
2. 执行 fs.readFile 操作，将文件读取请求添加到事件循环中的 I/O 队列中。
3. 在事件循环的IO阶段，将会检查IO队列，并将文件读取请求移动到 I/O 线程池中执行实际的文件 I/O 操作。
4. poll 阶段： 当文件读取操作完成后，I/O 线程将触发一个回调函数。主线程将该回调函数放入事件循环的下一个阶段（poll 阶段）中待执行。
    * 在 poll 阶段时耗时超过 200ms，导致 setTimeout 被延迟执行。
    * 执行 setTimeout 回调
