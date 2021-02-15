const router = require('express').Router();
const NotFoundError = require('./not-found-error');

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Внутренняя ошибка сервера'
        : message,
    });
});

module.exports = router;
