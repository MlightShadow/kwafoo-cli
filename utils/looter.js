// looter.loot('下载地址', '本地存储路径', '文件名');
module.exports = {
    loot: function (imgSrc, dirName, fileName) {
        const path = require('path')

        const http = require('http')
        const fs = require('fs')

        console.log('start downloading ' + imgSrc)
        let req = http.request(imgSrc, function (res) {
            console.log('request: ' + imgSrc + ' return status: ' + res.statusCode)
            let contentLength = parseInt(res.headers['content-length'])

            let downLength = 0

            let out = fs.createWriteStream(dirName + '/' + fileName)
            res.on('data', function (chunk) {
                downLength += chunk.length
                let progress = Math.floor(downLength * 100 / contentLength)
                let str = '下载：' + progress + '%'
                console.log(str)

                // 写文件
                out.write(chunk, function () {
                    // console.log(chunk.length);

                })
            })
            res.on('end', function () {
                downFlag = false
                console.log('end downloading ' + imgSrc)
                if (isNaN(contentLength)) {
                    console.log(imgSrc + ' content length error')
                    return
                }
                if (downLength < contentLength) {
                    console.log(imgSrc + ' download error, try again')
                }
            })
        })
        req.on('error', function (e) {
            console.log('request ' + imgSrc + ' error, try again')
        })
        req.end()
    }
}