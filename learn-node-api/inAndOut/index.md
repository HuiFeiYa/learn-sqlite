# process
process 对象是 EventEmitter 的实例。

```
class process {}
...

const process = new process();  // 忽略类、变量同名的语法错误

...
<强行改 process 继承关系自 EventEmitter>;
globalThis.process = process;
...

process.<xxx> = xxx;
process.<yyy> = yyy;

process.on(...);

```
## process.stdout
类型:Stream
```
process.stdout.write('abcd--------')
```
将 str 内容写入到 buffer 缓存区。

## process.stdin
类型:Stream

```
process.stdin.on('data', buffer=>{
    console.log('receive data:', buffer.toString('utf8'))
})
```
读取缓存区内容

## 管道
通过管道的方式将 index.js 写入流在 main.js 中进行读取
node .\index.js | node .\main.js

## process.env
process.env 对象实际上是一个类似于 Proxy 的劫持对象，每次获取字段时都通过 libuv 从系统中获取一遍，每次设置的时候，实际上都是通过 libuv 把为当前 Node.js 进程设置上对应环境变量。