const fs = require("fs")

fs.open("./logs.txt", "w", (err, fd) => {
    if (err) throw Error(err.message)
    process.stdin.on("data", data => {
        fs.write(fd, data.toString() + "\n", (err) => {
            if (err) throw Error(err.message)
        })
    })
})

