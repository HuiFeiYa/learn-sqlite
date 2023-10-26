const fs = require("node:fs")

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