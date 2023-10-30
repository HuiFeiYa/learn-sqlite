## 前置知识

### 文件句柄

在 Node.js 中，文件句柄（File Handle）是指一个程序用于访问文件的唯一标识符。它通常是一个整数，它代表了操作系统内核中关于该文件的信息，包括文件的打开模式、位置、权限等等。

当程序需要读写文件时，需要先通过文件路径或文件描述符获得文件句柄，然后才能进行文件的读写操作。

在 Node.js 中，文件句柄可以使用 fs 模块中的一些方法来获取，比如 fs.open() 方法可以打开一个文件并返回其文件句柄。获取到文件句柄之后，我们可以使用 fs.read()、fs.write() 等方法来读写文件内容，使用 fs.close() 方法来关闭文件句柄。

### 文件描述符

文件描述符（File Descriptor）是一种在操作系统中用于标识和跟踪打开文件或其他 I/O 资源的整数值。它是操作系统为每个进程维护的一种数据结构，用于表示该进程当前打开的文件或设备。

在 Unix-like 系统中，包括 Linux 和 macOS，文件描述符是非负整数。通常，0、1 和 2 是预留的文件描述符，分别代表标准输入（stdin）、标准输出（stdout）和标准错误输出（stderr）。其他的文件描述符会依次递增，每个打开的文件或设备都会被分配一个唯一的文件描述符。

### FileHandle

在 Node.js 中，可以使用 fs 模块中的相关方法，如 fs.open()、fs.read()、fs.write()、fs.close() 来操作文件描述符。

文件描述符的用途：

- 文件读取和写入
- 文件操作控制，如：chmod 修改文件权限，更改所有者
- 文件位置控制：seek 将文件移动到指定位置
- 文件关闭：使用 close 方法关闭文件，释放相关资源

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
const fileHandle = await fs.promises.open("learn-node-api/fs/temp.txt", "r");
console.log("File handle:", fileHandle);
// 创建文件读取流
const stream = fileHandle.createReadStream();
// 监听文件读取数据
stream.on("data", (chunk) => {
  console.log(
    `Received ${chunk.length} bytes of data. string: ${chunk.toString()}`
  );
});
// 在这里可以进行对文件句柄的操作

stream.on("end", () => {
  console.log("Finished reading the file.");
  fileHandle.close();
});
stream.on("error", (err) => {
  console.error("Error reading the file:", err);
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
# fileHandle

## fileHandle.readv

> 从文件读取并写入 <ArrayBufferView> 的数组.

filehandle.readv() 方法会将文件中的数据按顺序填充到传递的 <ArrayBufferView> 对象中。具体来说，它会从文件的当前位置开始读取数据，并将数据逐个字节地填充到每个缓冲区中，直到所有缓冲区都被填满或文件的末尾被达到。

这里我们传递到 <ArrayBufferView> 对象是 buffer 数组。

<ArrayBufferView> 可以是以下类型之一：

Buffer：Node.js 特有的类型，用于表示二进制数据的缓冲区。
TypedArray：包括 Int8Array、Uint8Array、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array 等类型的数组，用于表示特定类型的二进制数据。
DataView：用于以不同字节顺序读取和写入二进制数据的通用接口。

总结起来，<ArrayBufferView> 是一组用于表示和操作二进制数据的对象，在 filehandle.readv() 方法中用于接收从文件中读取的数据。读取操作会将数据逐个字节地填充到每个缓冲区中，你可以通过访问缓冲区对象来获取读取的数据。

```js
async function readv() {
  const fileHandle = await fs.promises.open("learn-node-api/fs/temp.txt", "r");
  // 创建两个缓冲区
  const buffer1 = Buffer.alloc(10); // 10字节大小的缓冲区
  const buffer2 = Buffer.alloc(20); // 20字节大小的缓冲区

  // 将缓冲区放入数组
  const buffers = [buffer1, buffer2];
  fileHandle
    .readv(buffers, 0)
    .then((result) => {
      const bytesRead = result.bytesRead;
      console.log(`读取了 ${bytesRead} 字节的数据`);

      // 可以通过 buffer1 和 buffer2 访问读取的数据
      console.log("buffer1:", buffer1.toString());
      console.log("buffer2:", buffer2.toString());

      // 关闭文件句柄
      fileHandle.close();
    })
    .catch((error) => {
      console.error("读取文件失败:", error);
    });
}
```

## fileHandle.stat()

filehandle.stat([options]) 方法用于获取文件的元数据信息，例如文件大小、修改时间等

```js
async function stat() {
  const fileHandle = await fs.promises.open("learn-node-api/fs/temp.txt", "r");
  fileHandle.stat().then((stats) => {
    console.log("文件大小:", stats.size, "字节");
    console.log("是否为目录:", stats.isDirectory());
    console.log("最后修改时间:", stats.mtime);
    console.log("创建时间:", stats.birthtime);
    fileHandle.close();
  });
}
```

## fileHandle.write(buffer, offset)

将 buffer 写入文件。

1. 先打开 fileHandle
2. 创建写入 buffer 缓冲区
3. 将缓冲区文件写入打开的 fileHandle

```js
async function writeFileFileHandle() {
  const fileHandle = await fs.promises.open(
    "learn-node-api/fs/output.txt",
    "w"
  );
  const buffer = Buffer.from("this is a raining day");
  fileHandle
    .write(buffer, 0)
    .then((bytesWritten) => {
      console.log(`写入了 ${bytesWritten} 字节数据`);

      // 关闭文件句柄
      fileHandle.close();
    })
    .catch((error) => {
      console.error("写入文件失败:", error);
    });
}
```

## fileHandle.writeFile(string)

将 string 写入文件。 如果 string 不是字符串，则 promise 使用错误拒绝。

```js
async function writeFileHandle() {
  const fileHandle = await fs.promises.open(
    "learn-node-api/fs/output.txt",
    "w"
  );
  const data =
    "filehandle.writeFile(data, options) 方法用于向文件中写入数据，与 fs.writeFile() 方法类似。它接受一个字符串、Buffer 或 Uint8Array 类型的数据作为要写入的内容，并可以指定一些选项参数。该方法返回一个 Promise 对象，当写入完成时会解析为 undefined。";
  fileHandle
    .writeFile(data, {
      encoding: "utf-8",
    })
    .then((res) => {
      fileHandle.close();
    });
}
```

### fileHandle.writeFile(string) 和 fileHandle.write 的区别

- 入参区别
- filehandle.writeFile() 方法通常用于一次性将全部数据写入文件中，而 fsPromises.write() 方法则可以用于分多次将数据写入文件中。

# fsPromises

## fs.promises.mkdir(destPath)
如果 recursive 为 false，则使用 undefined 履行；如果 recursive 为 true，则使用创建的第一个目录路径履行。

```js
async function mkdir() {
  const dir = await fs.promises.mkdir('learn-node-api/fs/customDir')
  console.log(dir) // undefined

  const dir = await fs.promises.mkdir('learn-node-api/fs/customDir/a/b', {recursive:true})
  console.log(dir) // "D:\\resource\\learn-sqlite\\learn-node-api\\fs\\customDir\\a"

}
```
## fsPromises.open(path, flags[, mode])

```js
await fs.promises.open("learn-node-api/fs/output.txt", "w");
await fs.promises.open("learn-node-api/fs/output.txt", "r"); // 默认flags
```

## fs.promises.access(path)

判断文件是否存在
不建议在调用 fsPromises.open() 之前使用 fsPromises.access() 检查文件的可访问性。 这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。 而是，用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误。

```js
async function access() {
  // 检查文件是否存在
  fs.promises
    .access("learn-node-api/fs/output1.txt")
    .then(() => {
      console.log("文件存在");
    })
    .catch(() => {
      console.error("文件不存在");
    });
}
```

## fsPromise.appendFile

异步地将数据追加到文件，如果该文件尚不存在，则创建该文件。 data 可以是字符串或 <Buffer>

```js
async function appendFile() {
  fs.promises
    .appendFile("learn-node-api/fs/output.txt", "\n append data ", {
      encoding: "utf-8",
    })
    .then(() => {
      console.log("数据已成功添加到文件末尾");
    })
    .catch((error) => {
      console.error("添加数据到文件失败:", error);
    });
}
```

## fsPromise.copyFile(src,dest)

fsPromises.copyFile(src, dest[, mode]) 方法用于将文件从源路径复制到目标路径。它接受源路径和目标路径作为参数，并可以指定一个可选的模式参数。该方法返回一个 Promise 对象，当复制完成时会解析为 undefined。

```js
const fs = require("fs").promises;

// 源文件路径和目标文件路径
const srcPath = "/path/to/source/file";
const destPath = "/path/to/destination/file";

// 复制文件
fs.copyFile(srcPath, destPath)
  .then(() => {
    console.log("文件已成功复制");
  })
  .catch((error) => {
    console.error("文件复制失败:", error);
  });
```

## fsPromises.cp(sourcePath, targetPath, options)

将整个目录结构从 src 异步地复制到 dest，包括子目录和文件。

当将目录复制到另一个目录时，不支持 globs，并且行为类似于 cp dir1/ dir2/。

复制文件夹时需要指定 recursive , 默认为 false

```js
async function copyDir() {
  fs.promises
    .cp("learn-node-api/event", "learn-node-api/fs/event", { recursive: true })
    .then(() => {
      console.log("数据已成功添加到文件末尾");
    })
    .catch((error) => {
      console.error("添加数据到文件失败:", error);
    });
}
```

## fsPromise.opendir(destPath)
方法用于打开指定路径的目录，并返回一个 fs.Dir 对象。通过这个对象，可以遍历目录中的文件和子目录，并进行相关操作。
```js
async function readDir() {
  try {
    const dir = await fspromises.opendir('learn-node-api/fs');
    console.log(`打开目录成功：${dir.path}`);

    for await (const dirent of dir) {
      console.log(dirent.name);
    }
    // 使用 dir.close() 方法关闭目录是为了确保在不再需要操作目录时释放相关资源.
    await dir.close();
    console.log('关闭目录成功');

  } catch (error) {
    console.error(error);
  }
}
```

## fs.promises.readdir(path)

```js
const fs = require('fs').promises;

async function readDir() {
  try {
    const files = await fs.readdir('/path/to/directory');
    /**
     * [
        "customDir",
        "index.js",
        "index.md",
        "output.txt",
        "temp",
        "temp.txt",
        ]
     */
    for (const file of files) {
      const filePath = '/path/to/directory/' + file;
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        console.log(`${file} 是一个文件`);
      } else if (stats.isDirectory()) {
        console.log(`${file} 是一个文件夹`);
      }
    }

  } catch (error) {
    console.error(error);
  }
}

readDir();

```

## fsPromises.readFile(path, {encoding: 'utf-8'})
异步地读取文件的全部内容。

如果未指定编码（使用 options.encoding），则数据作为 <Buffer> 对象返回。 否则，数据将为字符串。
```js
async function readFile1() {
  const content = await fspromises.readFile('learn-node-api/fs/a.json');
  const s = content.toString()
  const v = JSON.parse(s)
  console.log(v.a) // 1
}
```

## fsPromises.rename(oldPath newPath)
将 oldPath 重命名为 newPath。

```js
async function rename() {
  await fs.promises.rename('learn-node-api/fs/a.json', 'learn-node-api/fs/a-new.json')
}
```

## fsPromise.rm(path, {recursive: true})
fsPromises.rm() 方法用于异步地删除指定路径的文件或目录。

需要注意的是，fsPromises.rm() 方法在删除目录时必须指定 recursive 选项。如果省略该选项，将会抛出一个 Error。
```js
async function rmdir() {
  await fspromises.rm('learn-node-api/fs/a-new.json', { recursive: true })
}
rmdir()
```
# 通用

## 文件系统标志

以下标志在 flag 选项接受字符串的任何地方可用。

'a': 打开文件进行追加。 如果文件不存在，则创建该文件。

'ax': 类似于 'a' 但如果路径存在则失败。

'a+': 打开文件进行读取和追加。 如果文件不存在，则创建该文件。

'ax+': 类似于 'a+' 但如果路径存在则失败。

'as': 以同步模式打开文件进行追加。 如果文件不存在，则创建该文件。

'as+': 以同步模式打开文件进行读取和追加。 如果文件不存在，则创建该文件。

'r': 打开文件进行读取。 如果文件不存在，则会发生异常。

'r+': 打开文件进行读写。 如果文件不存在，则会发生异常。

'rs+': 以同步模式打开文件进行读写。 指示操作系统绕过本地文件系统缓存。

这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

这不会将 fs.open() 或 fsPromises.open() 变成同步阻塞调用。 如果需要同步操作，应该使用类似 fs.openSync() 的东西。

'w': 打开文件进行写入。 创建（如果它不存在）或截断（如果它存在）该文件。
