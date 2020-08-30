module.exports = function checkAuth(req, res, next) {
    var token = req.session.token;
    console.log('TOKEN is',token);
  try {
      var result = jwt.verify(token, 'mk');
      next()  
    } catch (error) {
      res.json('KO VAO DUOC')
    }
  }