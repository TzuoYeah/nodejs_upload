const db = require('../db')

exports.uploadFile = async (req, res) => {
    let options={
        userId : req.body.userId,
        fileName : req.file.originalname,
        buffer : req.file.buffer,
    }
    const mes = await db.saveFile(options)
    res.send( mes )
}
exports.getFile = async (req, res) => {
    const foo = await db.getFile({ userId:req.params.id, filename:req.params.filename })
    if(foo.fail){
        res.send(foo.fail)
    }else{
        res.set('Content-Type', 'image/png')
        res.send(foo.buffer)
    }
}