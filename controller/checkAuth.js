var jwt = require('jsonwebtoken');
var User = require('../data/account')

module.exports = function (req, res, next) {
    var token = req.session.token;
  try {
    var result = jwt.verify(token, 'mk');
    User.findOne({
      _id:result,
    })
      .then(data => {
        if (!data) {res.json('KHONG HOP LE')}
        req.user = data.username;
        next(); 
      })
      .catch(err => {
        res.json(err)
      })
       
    } catch (error) {
      res.json(error)
    }
}
