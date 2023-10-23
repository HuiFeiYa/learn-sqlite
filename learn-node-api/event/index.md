## 事件：'newListener'

在将监听器添加到其内部监听器数组之前，EventEmitter 实例将触发自己的 'newListener' 事件。

为 'newListener' 事件注册的监听器会传入事件名称和对正在添加的监听器的引用

```js
myEmitter.once('newListener', (event, listener)=> {
    console.log('--',event, listener)
})

// 触发 newListener 事件 
myEmitter.on('event', () => {
console.log('A');
});
```

