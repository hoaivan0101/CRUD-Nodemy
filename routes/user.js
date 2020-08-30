var express = require('express');
var router = express.Router();
var User=require('../data/account')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var session = require('express-session')

//Set session

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 600000 }
}))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

//set passport-local login
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ 
      username: username,
      password: password,
    })
      .then(data => {
        if (!data) { return done(null, false) }
        else {return done(null,data)}
      })
      .catch(err => {
        return done(err)
      });
  }
));

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return res.json('Err') }
    if (!user) { return res.json('Fail') }
    var token = jwt.sign(user.id, 'mk');
    req.session.token = token;
    return res.json(token)
  })(req, res, next);
});

//Private

router.get('/private', checkAuth, function (req, res,next) {
  res.render('private')
})
// 
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/user')
})

function checkAuth(req, res, next) {
  var token = req.session.token;
  console.log(token);
  try {
    var result = jwt.verify(token, 'mk');
    next()  
  } catch (error) {
    res.json('KO VAO DUOC')
  }
}

module.exports = router;
