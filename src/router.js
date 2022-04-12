var express = require('express')
var router = express.Router()
var dotenv = require('dotenv').config()
var multer = require('multer')
var upload = multer({ dest: '/tmp/uploads' })
var { listAllFiles, uploadFile, extractFile, deleteFile } = require('./s3service')
var fs = require('fs')
var util = require('util')
var unlinkFile = util.promisify(fs.unlink)

// Get all the keys from bucket
router.get('/gallery', async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        var result = await listAllFiles()
        if (result) {
            var keySize = result.KeyCount
            var contents = result.Contents.sort((a, b) => b.LastModified - a.LastModified)
            var list = []
            for (var i = 0; i < keySize; i++) {
                var date = new Date(contents[i].LastModified);
                list.push({
                    key: contents[i].Key,
                    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                })
            }
            res.status(200).json({
                status: "Success",
                size: keySize,
                gallery: list
            })
        }
        else {
            res.status(200).json({
                status: "Failed"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})

// Upload the file to s3
router.post('/upload', upload.single('file'), async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        try {
            var result = await uploadFile(req.file)
            if (result) {
                await unlinkFile(req.file.path)
                res.status(200).json({
                    status: "Success"
                })
            }
            else {
                res.status(200).json({
                    status: "Failed"
                })
            }
        }
        catch (err) {
            res.status(200).json({
                status: "Failed"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})

// Extract the file from key
router.get('/extract', async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        try {
            var result = await extractFile(req.query.key)
            if (result) {
                var b64 = Buffer.from(result.Body).toString('base64')

                res.status(200).json({
                    status: "Success",
                    base64: b64,
                    date: result.LastModified
                })
            }
            else {
                res.status(200).json({
                    status: "Failed"
                })
            }
        }
        catch (err) {
            res.status(200).json({
                status: "Failed"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})

// Delete the file from key
router.get('/delete', async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        try {
            var result = await deleteFile(req.query.key)
            if (result) {
                res.status(200).json({
                    status: "Success"
                })
            }
            else {
                res.status(200).json({
                    status: "Failed"
                })
            }
        }
        catch (err) {
            res.status(200).json({
                status: "Failed"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})

module.exports = router;