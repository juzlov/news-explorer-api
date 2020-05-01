const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.all('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = router;
