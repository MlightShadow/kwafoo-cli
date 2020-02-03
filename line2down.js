var fs = require('fs')
var looter =require('./utils/looter')

const list_name = 'download.txt'
const img_path = `./file/${new Date().getTime()}/`

if (!fs.existsSync(img_path)) {
    fs.mkdirSync(img_path)
    console.log(`img_path: ${img_path} setup finished`)
}

var data = fs.readFileSync(list_name)
var lines = data.toString().split('\r\n')

lines.forEach(line => {
    looter.loot(line, img_path);
})