var express = require('express');
var passport = require('passport');
var router = express.Router();

function authenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', authenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  var model = {
    title: 'Login',
    callbackUrl: `${req.protocol}://${req.get('host')}/callback`,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0Domain: process.env.AUTH0_DOMAIN
  };
  res.render('login', model);
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect('/');
  });

module.exports = router;
