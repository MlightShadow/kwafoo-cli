module.exports = {
    get: function (url) {
        var request = require('request')
        return new Promise(function (resolve, reject) {
            request.get({
                url: url
            }, (error, response) => {
                if (!error && response.statusCode === 200) {
                    resolve(response)
                } else {
                    reject(error)
                }
            })
        })
    }
}