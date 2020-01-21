const scout = require('./utils/scout')
const YAML = require('yamljs')

yaml_main = YAML.load('./config/main.yaml');
console.log('load config: ' + JSON.stringify(yaml_main))

scout.get(yaml_main.application.url).then(
    response => {
        const {JSDOM} = require('jsdom')
        const jsdom = new JSDOM(response.body)

        const {window} = jsdom
        const {document} = window

        global.window = window
        global.document = document

        const $ = global.jQuery = require('jquery')
        const target = $(yaml_main.application.xpath)
        console.log(target.text())
    },
    error => {
        console.log(error)
    }
)