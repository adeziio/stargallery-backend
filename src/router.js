const express = require('express');
const Data = require('./data');
const router = express.Router();
const jsonParser = express.json();

// GET
router.get('/listGallery', (req, res) => {

})

// POST
router.post('/upload', (req, res) => {
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

module.exports = router;