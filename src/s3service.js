const s3 = require('aws-sdk/clients/s3')
const dotenv = require('dotenv').config()
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME || dotenv.parsed.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION || dotenv.parsed.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID_STARGALLERY || dotenv.parsed.AWS_ACCESS_KEY_ID_STARGALLERY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_STARGALLERY || dotenv.parsed.AWS_SECRET_ACCESS_KEY_STARGALLERY;

const s3Obj = new s3({
    region,
    accessKeyId,
    secretAccessKey
})

// Get all the keys from bucket
function listAllFiles() {
    const uploadParams = {
        Bucket: bucketName
    }

    return s3Obj.listObjectsV2(uploadParams).promise()
}

// Extract the file from key
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3Obj.upload(uploadParams).promise()
}

// Upload the file to s3
function extractFile(key) {
    const downloadParams = {
        Key: key,
        Bucket: bucketName
    }

    return s3Obj.getObject(downloadParams).promise()
}

exports.listAllFiles = listAllFiles
exports.uploadFile = uploadFile
exports.extractFile = extractFile