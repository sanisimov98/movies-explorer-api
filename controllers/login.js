const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const NotAuthorisedError = require('../errors/not-authorised-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Пользователь не найден') {
        throw new NotAuthorisedError('Введён неправильный адрес электронной почты или пароль');
      } else {
        next(err);
      }
    })
    .catch(next);
};
