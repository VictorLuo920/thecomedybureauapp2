const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

router.get('/', isLoggedIn, usersCtrl.show)
router.post('/:id', usersCtrl.createNote)
router.get('/edit', usersCtrl.edit)
router.put('/update/:id', usersCtrl.update)
router.delete('/delete/:id', usersCtrl.delete)

module.exports = router;
