var s3 = require('aws-sdk/clients/s3')
var dotenv = require('dotenv').config()

var bucketName = process.env.AWS_BUCKET_NAME || dotenv.parsed.AWS_BUCKET_NAME;
var region = process.env.AWS_BUCKET_REGION || dotenv.parsed.AWS_BUCKET_REGION;
var accessKeyId = process.env.AWS_ACCESS_KEY_ID_STARGALLERY || dotenv.parsed.AWS_ACCESS_KEY_ID_STARGALLERY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_STARGALLERY || dotenv.parsed.AWS_SECRET_ACCESS_KEY_STARGALLERY;

var s3Obj = new s3({
    region,
    accessKeyId,
    secretAccessKey
})

// Get all the keys from bucket
function listAllFiles() {
    var uploadParams = {
        Bucket: bucketName
    }

    return s3Obj.listObjectsV2(uploadParams).promise()
}

// Extract the file from key
function uploadFile(file) {
    var uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3Obj.upload(uploadParams).promise()
}

// Upload the file to s3
function extractFile(key) {
    var downloadParams = {
        Key: key,
        Bucket: bucketName
    }

    return s3Obj.getObject(downloadParams).promise()
}

exports.listAllFiles = listAllFiles
exports.uploadFile = uploadFile
exports.extractFile = extractFile