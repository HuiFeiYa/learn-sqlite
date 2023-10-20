
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