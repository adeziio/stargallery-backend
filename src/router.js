var express = require('express');
var Data = require('./data');
var router = express.Router();
var jsonParser = express.json();
var dotenv = require('dotenv').config();

// GET
router.get('/listGallery', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.STARGALLERY_URL || dotenv.parsed.STARGALLERY_URL);
    res.json({
        status: "Success"
    });
})

// POST
router.post('/upload', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.STARGALLERY_URL || dotenv.parsed.STARGALLERY_URL);

    // if (req.body.item) {
    //     Data.add(req.body.item);
    //     res.json({
    //         status: "Success"
    //     });
    // }
    // else {
    //     res.json({
    //         status: "Failed",
    //         message: "Please provide a parameter value for the key item"
    //     })
    // }
    res.json({
        status: "Success"
    });
})

// res.header('Access-Control-Allow-Methods', 'POST');
// res.header('Access-Control-Allow-Headers', 'Content-Type');

module.exports = router;