const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

module.exports = router;
