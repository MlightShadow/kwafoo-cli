const scout = require('./utils/scout')
const YAML = require('yamljs')
const xpath = require('xpath')
const xmldom = require('xmldom')
const cheerio = require('cheerio')

const dom = new xmldom.DOMParser({
    errorHandler: {
        warning: function (w) {},
        error: function (e) {},
        fatalError: function (fe) {}
    }
})

yaml_main = YAML.load('./config/main.yaml');
console.log('load config: ' + JSON.stringify(yaml_main))

scout.get(yaml_main.application.url).then(
    response => {
       // var doc = dom.parseFromString(response.body)
       // console.log(xpath.select(yaml_main.application.xpath, doc))

       let $ = cheerio.load(response.body)
       console.log($(yaml_main.application.xpath))
    },
    error => {
        console.log(error)
    }
)