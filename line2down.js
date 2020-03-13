var fs = require('fs')
var request = require('request')

const list_name = 'download.txt'
const img_path = `./file/${new Date().getTime()}/`

if (!fs.existsSync(img_path)) {
    fs.mkdirSync(img_path)
    console.log(`img_path: ${img_path} setup finished`)
}

var data = fs.readFileSync(list_name)
var lines = data.toString().split('\r\n')

var promise_num = 0

function doLoot(line) {
    const filename = line.slice(line.lastIndexOf('/') + 1)
    new Promise(function (resolve) {
        promise_num++
        console.log(`promise remain: ${promise_num} will be working`)
        var writeStream = fs.createWriteStream(img_path + filename);
        var readStream = request(line, {
            timeout: 20000
        })
        readStream.pipe(writeStream);
        readStream.on('error', function (err) {
            promise_num--
            console.log(`restart line: ${line}\nBY ERROR: ${err}\n--------`)
            doLoot(line)
        })
        writeStream.on("finish", function () {
            writeStream.end();
            resolve(line)
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

lines.forEach(line => {
    doLoot(line);
})