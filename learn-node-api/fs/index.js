const fs = require("node:fs")

const fspromises = require('fs').promises;
const os = require('os');

async function rmdir() {
  await fspromises.rm('learn-node-api/fs/a-new.json', { recursive: true })
}
rmdir()

async function rename() {
  await fs.promises.rename('learn-node-api/fs/a.json', 'learn-node-api/fs/a-new.json')
}
// rename()
async function readFile1() {
  const content = await fspromises.readFile('learn-node-api/fs/a.json');
  const s = content.toString()
  const v = JSON.parse(s)
  console.log(v.a)
}
// readFile1()

async function readDir1() {
  try {
    const files = await fspromises.readdir('learn-node-api/fs');
    console.log(`读取目录成功：${files}`);

    for (const file of files) {
      console.log(file);
    }

  } catch (error) {
    console.error(error);
  }
}

// readDir1();

async function readDir() {
  try {
    const dir = await fspromises.opendir('learn-node-api/fs/temp');
    console.log(`打开目录成功：${dir.path}`);

    for await (const dirent of dir) {
      console.log(dirent.name);
    }
    // 使用 dir.close() 方法关闭目录是为了确保在不再需要操作目录时释放相关资源
    // await dir.close();
    console.log('关闭目录成功');

  } catch (error) {
    console.error(error);
  }
}

// readDir();


async function createTempDir() {
  try {
    const tempDir = await fspromisespromises.mkdtemp(`${os.tmpdir()}/example-`);
    console.log(`创建临时目录成功：${tempDir}`);

    // 可以在新创建的目录中进行操作
    // ...

  } catch (error) {
    console.error(error);
  }
}

// createTempDir();


async function mkdir() {
  const dir = await fs.promises.mkdir('learn-node-api/fs/customDir/a/b', {recursive:true})
  console.log(dir)
}

// mkdir()
async function getFileStats() {
  try {
    const stats1 = await fs.promises.stat('learn-node-api/fs/temp.txt');
    console.log('调用 stat() 返回的状态信息：', stats1);

    const stats2 = await fs.promises.lstat('learn-node-api/fs/temp.txt');
    console.log('调用 lstat() 返回的状态信息：', stats2);

  } catch (error) {
    console.error(error);
  }
}

// getFileStats();


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


async function readFile() {
    const fileHandle = await fsPromise.open('learn-node-api/fs/temp.txt');
    const buffer = Buffer.alloc(100)
    const data = await fileHandle.read(buffer,0, buffer.length)
    const {  bytesRead } = data
    console.log(buffer.toString())
}
// readFile()

async function openDir() {
  const dir = await fsPromise.opendir('learn-node-api/fs/temp')
  for await (const dirent of dir) {
    console.log(dirent.name);
  }
}