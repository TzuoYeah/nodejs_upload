const db = require('../db')

exports.uploadFile = async (req, res) => {
    if(!req.file) return res.send( {failed:"Data deficient."} )
    if(!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) return res.send( {failed:"Invalid file format."} )
    const options={
        userId : req.body.userId,
        fileName : req.file.originalname,
        buffer : req.file.buffer,
    }
    res.send( await db.saveFile(options) )
}
exports.getFile = async (req, res) => {
    const file = await db.getFile({ userId:req.params.id, fileName:req.params.fileName })
    if(file.failed) return res.send(file.failed)
    res.set('Content-Type', 'image/png')
    return res.send(file.buffer)
}
exports.getFileList = async (req, res) => {
    const files = await db.getFiles({ userId:req.params.id})
    if(files.failed){
        res.send(files.failed)
    }else{
        let ary =[]
        files.forEach(e => ary.push(e.fileName));
        res.send(ary)
    }
}