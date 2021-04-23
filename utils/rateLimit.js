const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60000,
  max: 1000,
});

router.use(limiter);

module.exports = router;
