## 执行顺序
```js
timers // Node.js 会检查是否有定时器需要触发，并执行这些定时器的回调函数。
poll // poll 阶段是负责处理 I/O 相关的操作的阶段
check // setImmediate() 回调在此处被调用。
close callbacks // 
```
* timers
检查定时器队列：Node.js 维护了一个定时器队列，其中保存了所有通过 setTimeout() 或 setInterval() 函数注册的定时器对象。在进入 timers 阶段时，Node.js 会先检查定时器队列，判断哪些定时器已经到期，需要触发回调函数。

* poll
检查 I/O 队列：Node.js 会检查是否有待处理的 I/O 回调函数。这些回调函数可以是基于网络操作、文件系统操作或其他类似的异步操作注册的。

执行 I/O 回调函数：如果有待处理的 I/O 回调函数，Node.js 将依次执行它们。这些回调函数通常是异步操作完成后触发的。

执行定时器：在 poll 阶段，Node.js 会检查是否有定时器到期。如果有定时器到期，将会跳过剩余的 poll 阶段，直接进入 timers 阶段执行定时器的回调函数。

处理事件队列：如果在 poll 阶段没有发现待处理的 I/O 回调函数，并且没有定时器到期，Node.js 将会处理事件队列中的其他回调函数。这些回调函数可能来自于 setTimeout、setInterval、setImmediate 等。

等待新的事件触发或定时器：如果既没有待处理的 I/O 回调函数，也没有定时器到期，并且事件队列为空，那么 Node.js 将会等待新的事件触发（如新的 I/O 操作）或者有定时器到期。

* check
在 Node.js 中，setImmediate 注册的回调函数会在当前事件循环的末尾被执行，而不是在本次 tick（即同一个阶段）中立即执行。

* close callbacks 
close callbacks：一些关闭的回调函数，如：socket.on('close', ...)。

* process.nextTick promise.then
都会在本次事件循环执行，属于微任务，在经过当前阶段（例如 poll 阶段）的处理后，Node.js 将会检查微任务队列。在本次事件循环中执行。

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
    * 在 poll 阶段队列不为空，耗时超过 200ms
5. 事件循环在 timers 阶段执行 setTimeout 回调
