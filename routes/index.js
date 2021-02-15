const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.post(
  '/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login,
);
router.post(
  '/signup', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).unknown(true),
  }), createUser,
);

module.exports = router;
