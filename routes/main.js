var express = require('express');
var router = express.Router();
var User=require('../data/account')

router.get('/', function (req, res) {
    console.log(req.session);
    res.json('ABCASDASDSAD')
})

module.exports = router;