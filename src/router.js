const express = require('express');
const Data = require('./data');
const router = express.Router();
const jsonParser = express.json();

// GET
router.get('/listGallery', (req, res) => {

})

router.get('/add', jsonParser, (req, res) => {
    // if (req.query.item) {
    //     Data.add(req.query.item);
    //     res.json({
    //         status: "Success"
    //     })
    // }
    // else {
    //     res.json({
    //         status: "Failed",
    //         message: "Please provide a parameter value for the key item"
    //     })
    // }
})

// POST
router.post('/add', jsonParser, (req, res) => {
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
})

module.exports = router;