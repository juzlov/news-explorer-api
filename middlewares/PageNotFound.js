const router = require('express').Router();

router.all('*', (req, res, next) => {
  res.status(404).send({ message: 'Page not found' });
  next();
});

module.exports = router;
