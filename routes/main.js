var express = require('express');
var router = express.Router();
var todoJob = require('../data/listjob')
var checkAuth = require('../controller/checkAuth')

router.get('/', function (req, res) {
    res.render('main')
})

router.get('/todo', function (req, res) {
    console.log(req.user);
    todoJob.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.json(err)
    })
})

router.post('/todo',function (req, res) {
    todoJob.create({
        title: req.body.title,
        username:req.user,
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.put('/todo/:id', function (req, res) {
    todoJob.updateOne({
        _id:req.params.id
    }, {
        title: req.body.title
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.delete('/todo/:id', function (req, res) {
    todoJob.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router;