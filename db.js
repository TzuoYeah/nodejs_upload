const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect('mongodb://root:0000@127.0.0.1/testDatabase?authSource=admin')
const db = mongoose.connection

db.on('error',err =>{
    console.error('\u001b[31m' +'MongoDB error ' + '\u001b[0m' + err.message)
    process.exit(1)
})
db.once('open',()=> console.log('MongoDB connection established'))

module.exports = {
    saveFile:async(options={})=>{ 
        if(!options.userId| !options.fileName| !options.buffer) return {failed:"Data deficient."}
        if(!await module.exports.getUser(options)) module.exports.addUser(options)
        const user = await module.exports.getUser(options)
        if(await user.files.find(e => e.fileName==options.fileName)) return {failed:"file already exists."}

        const file = {
            fileName : options.fileName ,
            buffer : options.buffer
        }
        user.files.push(file)
        user.save()

        return {success:options.fileName}
    },
    getFile:async(options={})=>{
        if(!options.userId| !options.fileName ) return {failed:"Data deficient."}
        const user = await module.exports.getUser(options)
        if(!user) return {failed:"User does not exist."}

        const index = await user.files.findIndex(e => e.fileName==options.fileName)
        if(index == -1) return {failed:"file does not exist."}
        return user.files[index]
    },
    getFiles:async(options={})=>{
        if(!options.userId) return {failed:"Data deficient."}
        const user = await module.exports.getUser(options)
        if(!user) return {failed:"User does not exist."}

        return user.files
    },
    addUser:async(options={})=>{
        await new User({
            userId : options.userId ,
            files:[]
        }).save() 
        return {success:options.userId}
    },
    getUser:async(options={})=>{
        const user = await User.findOne(options)
        return user
    }
}