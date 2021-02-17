const bcrypt = require('bcrypt');
const Users = require('../models/user');
const WrongDataError = require('../errors/wrong-data-error');
const EmailAlreadyInUseError = require('../errors/email-already-in-use-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.createUser = (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email, password: hash, name,
      })
        .then((user) => {
          res.send({
            email: user.email,
            name: user.name,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new WrongDataError('Переданы неверные данные');
          } else if (err.name === 'MongoError' && err.code === 11000) {
            throw new EmailAlreadyInUseError('Этот адрес электронной почты уже используется!');
          } else {
            next(err);
          }
        })
        .catch(next);
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  try {
    Users.findById({ _id: req.user._id })
      .then((user) => {
        if (user) {
          res.send({ email: user.email, name: user.name });
        } else {
          throw new NotFoundError('Пользователь не найден');
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = (req, res, next) => {
  try {
    const { name, email } = req.body;
    const owner = req.user._id;
    if (name && email) {
      Users.findByIdAndUpdate(owner, { name, email }, { new: true })
        .then((user) => res.send({ email: user.email, name: user.name }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new WrongDataError('Переданы неверные данные');
          } else {
            next(err);
          }
        })
        .catch(next);
    } else {
      throw new WrongDataError('Переданы неверные данные');
    }
  } catch (err) {
    next(err);
  }
};
