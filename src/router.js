var express = require('express')
var router = express.Router()
var dotenv = require('dotenv').config()
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var { listAllFiles, uploadFile, extractFile } = require('./s3service')
var fs = require('fs')
var util = require('util')
var unlinkFile = util.promisify(fs.unlink)

// Get all the keys from bucket
router.get('/gallery', async (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.STARGALLERY_URL || dotenv.parsed.STARGALLERY_URL)
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    var result = await listAllFiles()
    if (result) {
        var contents = result.Contents
        var list = []
        for (var i = 0; i < contents.length; i++) {
            list.push(contents[i].Key)
        }

        res.json({
            status: "Success",
            gallery: list
        })
    }
    else {
        res.json({
            status: "Error"
        })
    }

})

// Upload the file to s3
router.post('/upload', upload.single('file'), async (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.STARGALLERY_URL || dotenv.parsed.STARGALLERY_URL)
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    var result = await uploadFile(req.file)
    if (result) {
        await unlinkFile(req.file.path)
        res.json({
            status: "Success"
        })
    }
    else {
        res.json({
            status: "Error"
        })
    }


})

// Extract the file from key
router.get('/extract', async (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.STARGALLERY_URL || dotenv.parsed.STARGALLERY_URL)
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    var result = await extractFile(req.query.key)
    if (result) {
        var b64 = Buffer.from(result.Body).toString('base64')
        var mimeType = 'image/jpg'
        var src = `data:${mimeType};base64,${b64}`

        res.json({
            status: "Success",
            src: src
        })
    }
    else {
        res.json({
            status: "Error"
        })
    }
})



module.exports = router;