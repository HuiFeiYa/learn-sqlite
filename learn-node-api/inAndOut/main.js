process.stdin.on('data', buffer=>{
    console.log('receive data:', buffer.toString('utf8'))
})