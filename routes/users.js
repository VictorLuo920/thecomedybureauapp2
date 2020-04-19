const router = require('express').Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.show)
router.post('/:id', usersCtrl.createNote)
router.get('/edit', usersCtrl.edit)
router.put('/:id', usersCtrl.update)
router.delete('/:id', usersCtrl.delete)

module.exports = router;
