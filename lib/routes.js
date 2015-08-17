var express = require('express');
var passport = require('passport');
var _ = require('lodash');
var router = express.Router();

function authenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', authenticated, function(req, res, next) {
  var linkUrl = `https://${process.env.AUTH0_DOMAIN}/authorize
?response_type=code
&scope=openid
&client_id=${process.env.AUTH0_CLIENT_ID}
&redirect_uri=${req.protocol}://${req.get('host')}/callback
&access_token=${req.user.access_token}
&connection=${process.env.AUTH0_GITHUB_CONNECTION}`;

  var model = {
    title: 'Express',
    linkUrl: linkUrl
  };

  var ghIdentity = _.find(req.user.identities, { provider: 'github'});
  if (ghIdentity) {
    model.github_username = ghIdentity.profileData.nickname;
  }

  res.render('index', model);
});

router.get('/login', function(req, res, next) {
  var model = {
    title: 'Login',
    callbackUrl: `${req.protocol}://${req.get('host')}/callback`,
    auth0Connection: process.env.AUTH0_DEFAULT_CONNECTION,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0Domain: process.env.AUTH0_DOMAIN
  };
  res.render('login', model);
});

router.get('/callback', function(req, res, next) {
  passport.authenticate('auth0', function(err, user, info) {
    if (err) { return next(err); }
    if (req.user) { return res.redirect('/'); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
