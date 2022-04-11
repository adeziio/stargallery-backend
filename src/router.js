const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: '/tmp/uploads' })
const { listAllFiles, uploadFile, extractFile } = require('./s3service')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// Get all the keys from bucket
router.get('/gallery', async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        const result = await listAllFiles()
        if (result) {
            const contents = result.Contents
            const list = []
            for (const i = 0; i < contents.length; i++) {
                list.push(contents[i].Key)
            }

            res.status(200).json({
                status: "Success",
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
        const result = await uploadFile(req.file)
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
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})

// Extract the file from key
router.get('/extract', async (req, res) => {
    if (req.headers['stargallery-api-key'] === process.env.STARGALLERY_API_KEY || req.headers['stargallery-api-key'] === dotenv.parsed.STARGALLERY_API_KEY) {
        const result = await extractFile(req.query.key)
        if (result) {
            const b64 = Buffer.from(result.Body).toString('base64')
            const mimeType = 'image/*'
            const src = `data:${mimeType};base64,${b64}`

            res.status(200).json({
                status: "Success",
                src: src
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

module.exports = router;