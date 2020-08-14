var express = require('express');
var router = express.Router();

const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('profile', {user: req.user});
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/google/auth', passport.authenticate('google', { scope: 
  'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile' 
}));

// the callback after google has authenticated the user
router.get('/google/auth/redirect',
  passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash: true
  })
);

// can be written in separate file like other projects I have done.
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
