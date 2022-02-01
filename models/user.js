const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId : String,
    files:[{
        fileName : String,
        buffer : Buffer
    }]
})

const user = mongoose.model('user', userSchema)
module.exports = user