var multer  = require('multer')
var upload = multer()
const api = require('./handlers/api')

module.exports = function(app){
    app.post('/uploadFile',upload.single('field'), api.uploadFile)
    app.get('/getFile/:id/:fileName', api.getFile)
    app.get('/getFile/:id/', api.getFileList)
    
    app.use( (req,res)=> res.status(404).send('Not Found'))
    app.use( (err,req,res,next)=>  res.status(500).send('Internal Server Error'))
}