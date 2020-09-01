const express = require('express');
var router = express.Router();
var User = require('../data/account');

router.get('/', function (req, res) {
    res.render('signup')
})

router.post('/', function (req, res) {
    User.create(req.body)
        .then(data => {
            res.redirect('/user');
        })
        .catch(err => {
        res.redirect('/signup')
    })
})

module.exports =router;