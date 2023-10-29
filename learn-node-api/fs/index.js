const fs = require("node:fs")

async function copyDir() {
  fs.promises.cp('learn-node-api/event', 'learn-node-api/fs/event', {recursive:true})
  .then(() => {
    console.log('数据已成功添加到文件末尾');
  })
  .catch((error) => {
    console.error('添加数据到文件失败:', error);
  });
}
copyDir()

async function copyfile() {
  fs.promises.copyFile('learn-node-api/event/eventTarget.js', 'learn-node-api/fs/event')
  .then(() => {
    console.log('数据已成功添加到文件末尾');
  })
  .catch((error) => {
    console.error('添加数据到文件失败:', error);
  });
}
// copyfile()
async function appendFile() {
  fs.promises.appendFile('learn-node-api/fs/output.txt', '\n append data ', { encoding: 'utf-8' })
  .then(() => {
    console.log('数据已成功添加到文件末尾');
  })
  .catch((error) => {
    console.error('添加数据到文件失败:', error);
  });
}

// appendFile()

async function access() {
// 检查文件是否存在
  fs.promises.access('learn-node-api/fs/output1.txt')
  .then(() => {
    console.log('文件存在');
  })
  .catch(() => {
    console.error('文件不存在');
  });
}

// access()

async function writeFileHandle() {
  const fileHandle = await fs.promises.open('learn-node-api/fs/output.txt', 'w')
  const data = "filehandle.writeFile(data, options) 方法用于向文件中写入数据，与 fs.writeFile() 方法类似。它接受一个字符串、Buffer 或 Uint8Array 类型的数据作为要写入的内容，并可以指定一些选项参数。该方法返回一个 Promise 对象，当写入完成时会解析为 undefined。"
  fileHandle.writeFile(data, {
    encoding: 'utf-8'
  }).then(res => {
    fileHandle.close()
  })
}

// writeFileHandle()

async function writeHandle() {
  const fileHandle = await fs.promises.open('learn-node-api/fs/output.txt', 'w')
  const buffer = Buffer.from('this is a raining day')
  fileHandle.write(buffer,0).then((bytesWritten) => {
    console.log(`写入了 ${bytesWritten} 字节数据`);

    // 关闭文件句柄
    fileHandle.close();
  })
  .catch((error) => {
    console.error('写入文件失败:', error);
  });
}
// writeFileHandle()
async function stat() {
  const fileHandle = await fs.promises.open('learn-node-api/fs/temp.txt', 'r')
  fileHandle.stat().then(stats => {
    console.log('文件大小:', stats.size, '字节');
    console.log('是否为目录:', stats.isDirectory());
    console.log('最后修改时间:', stats.mtime);
    console.log('创建时间:', stats.birthtime);
    fileHandle.close()
  })
}
// stat()
async function readv() {
  const fileHandle = await fs.promises.open('learn-node-api/fs/temp.txt', 'r')
  // 创建两个缓冲区
  const buffer1 = Buffer.alloc(10); // 10字节大小的缓冲区
  const buffer2 = Buffer.alloc(20); // 20字节大小的缓冲区

  // 将缓冲区放入数组
  const buffers = [buffer1, buffer2];
  fileHandle.readv(buffers,0) .then((result) => {
    const bytesRead = result.bytesRead;
    console.log(`读取了 ${bytesRead} 字节的数据`);

    // 可以通过 buffer1 和 buffer2 访问读取的数据
    console.log('buffer1:', buffer1.toString());
    console.log('buffer2:', buffer2.toString());

    // 关闭文件句柄
    fileHandle.close()
  })
  .catch((error) => {
    console.error('读取文件失败:', error);
  });
}
// readv()
async function getFileHandle() {
  try {
    // 打开文件
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
    console.log('File handle closed.');
  } catch (err) {
    console.error(err);
  }
}

// getFileHandle();

function openFile() {
    /** 异步地打开文件。 */
    const res = fs.open('learn-node-api/fs/temp.txt', (err,fd) => {
        if(err) {
            throw err
        }
        const buffer = Buffer.alloc(1024);
      /** 从 fd 指定的文件中读取数据。 */
      fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
        if (err) {
          throw err;
        }
    
        console.log(`Read ${bytesRead} bytes from file: ${buffer.toString()}`);
    
        /** 关闭文件描述符。 */
        fs.close(fd, (err) => {
          if (err) {
            throw err;
          }
    
          console.log('File closed.');
        });
      });
    })
}

// openFile()

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
// writeFile()