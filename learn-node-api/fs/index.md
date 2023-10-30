## 前置知识

### 文件句柄
在 Node.js 中，文件句柄（File Handle）是指一个程序用于访问文件的唯一标识符。它通常是一个整数，它代表了操作系统内核中关于该文件的信息，包括文件的打开模式、位置、权限等等。

当程序需要读写文件时，需要先通过文件路径或文件描述符获得文件句柄，然后才能进行文件的读写操作。

在 Node.js 中，文件句柄可以使用 fs 模块中的一些方法来获取，比如 fs.open() 方法可以打开一个文件并返回其文件句柄。获取到文件句柄之后，我们可以使用 fs.read()、fs.write() 等方法来读写文件内容，使用 fs.close() 方法来关闭文件句柄。

### 文件描述符

文件描述符（File Descriptor）是一种在操作系统中用于标识和跟踪打开文件或其他I/O资源的整数值。它是操作系统为每个进程维护的一种数据结构，用于表示该进程当前打开的文件或设备。

在 Unix-like 系统中，包括 Linux 和 macOS，文件描述符是非负整数。通常，0、1 和 2 是预留的文件描述符，分别代表标准输入（stdin）、标准输出（stdout）和标准错误输出（stderr）。其他的文件描述符会依次递增，每个打开的文件或设备都会被分配一个唯一的文件描述符。

在 Node.js 中，可以使用 fs 模块中的相关方法，如 fs.open()、fs.read()、fs.write()、fs.close() 来操作文件描述符。

### 区别
总的来说，文件描述符是操作系统层面的标识符，而文件句柄更多地是在编程语言或库中使用的抽象对象。文件描述符是操作系统提供的底层概念，而文件句柄则是对文件描述符的高级封装，提供了更方便的接口和功能。在某些情况下，这两个术语可以互换使用，因为它们描述的是相同的概念，只是从不同的角度和层次进行描述。

# api

## fs.read
```js
async function readFile() {
    // 打开 <FileHandle>。文件系统流
    const fileHandle = await fsPromise.open('learn-node-api/fs/temp.txt');
    // 手动管理，将填充读取的文件数据的缓冲区
    const buffer = Buffer.alloc(100)
    const data = await fileHandle.read(buffer,0, buffer.length)
    const {  bytesRead } = data
    console.log(buffer.toString())
}
readFile()
```

## fs.createReadStream(path[, options])

创建文件读取流。

在 Node.js 中，可读流（Readable Stream）和可写流（Writable Stream）都是 EventEmitter 的子类，它们继承了 EventEmitter 的功能。

所以可以通过事件监听的方式来监听文件的读取的过程

```js
    const fileHandle = await fs.promises.open('learn-node-api/fs/temp.txt', 'r');
    console.log('File handle:', fileHandle);
    // 创建文件读取流
    const stream = fileHandle.createReadStream()
    // 监听文件读取数据
    stream.on('data', chunk => {
        console.log(`Received ${chunk.length} bytes of data. string: ${chunk.toString()}`);
    })
    // 在这里可以进行对文件句柄的操作

    stream.on('end', () => {
        console.log('Finished reading the file.');
    fileHandle.close();
    });
    stream.on('error', (err) => {
        console.error('Error reading the file:', err);
        fileHandle.close();
      });
```

## fs.createWriteStream(path[, options])
创建文件写入流。

```JS
function writeFile() {
    const writeStream = fs.createWriteStream('learn-node-api/fs/output.txt')
    /** 监听写入事件 */
    writeStream.on('open', (err,data)=> {
        console.log('open')
    })

    writeStream.on('ready', (err,data)=>{
        console.log('ready')
    })
    writeStream.on('error', (err,data)=>{
        console.log('error')
    })
    writeStream.on('finish', (err,data)=>{
        console.log('finish')
    })

    /** 写入数据 */
    writeStream.write('hello fs\n')
    writeStream.write('这里是一段文字\n')
    writeStream.write('结束写入\n')

    writeStream.end()
}
```

## filehandle.read() 和 fs.createReadStream() 区别
使用场景：

filehandle.read()：适用于对文件进行低级别的、手动控制的读取操作。它需要手动打开文件、读取数据、关闭文件，并且需要显式地管理缓冲区和读取位置。
fs.createReadStream()：适用于高级别的、自动化的读取操作。它提供了一个可读流（Readable Stream），可以自动处理文件的打开、读取、关闭等操作，并且可以通过事件或流式操作来处理数据。

缓冲区管理：

filehandle.read()：需要手动创建和管理缓冲区，将数据读取到指定的缓冲区中。
fs.createReadStream()：内部自动管理缓冲区，根据需要动态分配和释放缓冲区。
