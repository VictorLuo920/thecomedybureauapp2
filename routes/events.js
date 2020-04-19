const express = require('express');
const router = express.Router();
const passport = require('passport');
const eventsCtrl = require('../controllers/events')


// O-Auth below
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/',
      failureRedirect : '/'
    }
));
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

const isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}


router.get('/', eventsCtrl.index);
router.post('/:id', eventsCtrl.bookmark); 

module.exports = router;

