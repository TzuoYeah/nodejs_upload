const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    userId : String,
    fileName : String,
    buffer : Buffer
})

const file = mongoose.model('file', fileSchema)
module.exports = file