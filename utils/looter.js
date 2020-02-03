const request = require('request')
const fs = require('fs')
var promise_num = 0

module.exports = {
    loot: function (url, path) {
        const filename = url.slice(url.lastIndexOf('/') + 1)
        new Promise(function (resolve) {
            promise_num++
            console.log(`promise remain: ${promise_num} will be working`)
            var writeStream = fs.createWriteStream(path + filename);
            var readStream = request(url, {
                timeout: 20000
            })
            readStream.pipe(writeStream);
            readStream.on('error', function (err) {
                promise_num--
                console.log(`restart line: ${url}\nBY ERROR: ${err}\n--------`)
                doLoot(url)
            })
            writeStream.on("finish", function () {
                writeStream.end();
                resolve(url)
            });
        }).then(
            line => {
                console.log(`COMPLETE DONE!: ${line}`)
                promise_num--
                if (promise_num == 0) {
                    console.log(`--------ALL DOWNLOAD COMPLETE SUCCESSFUL--------`)
                }
            }
        )
    }
}