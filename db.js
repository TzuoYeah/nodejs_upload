const mongoose = require('mongoose')
const File = require('./models/file')

mongoose.connect('mongodb://root:0000@127.0.0.1/testDatabase?authSource=admin')
const db = mongoose.connection

db.on('error',err =>{
    console.error('\u001b[31m' +'MongoDB error ' + '\u001b[0m' + err.message)
    process.exit(1)
})
db.once('open',()=> console.log('MongoDB connection established'))


module.exports = {
    saveFile:async(options={userId:null,fileName:null,buffer:null})=>{  
        const foo = await File.find({userId:options.userId, fileName:options.fileName})
        if(foo.length) return {fail:"file is exist."}
        if(!options.userId|!options.fileName|!options.buffer) return {fail:"less data."}
        await new File({
            userId : options.userId ,
            fileName : options.fileName ,
            buffer : options.buffer
        }).save() 

        return {success:options.fileName}
    },
    getFile:async(options={})=>{
        const foo = await File.findOne(options)
        if(!foo) return {fail:"file is not exist."}
        return foo
    },
}