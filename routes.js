var multer  = require('multer')
var upload = multer()
const api = require('./handlers/api')

module.exports = function(app){
    app.post('/uploadFile',upload.single('field'), api.uploadFile)
    app.get('/getFile/:id/:filename', api.getFile)
}