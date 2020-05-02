const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  const unauthorized = new Unauthorized('');
  if (!authorization) {
    return res.status(unauthorized.statusCode).send({ message: 'Authorization required' });
  }

  let payload;

  try {
    if (NODE_ENV === 'production') {
      payload = jwt.verify(authorization, JWT_SECRET);
    } else {
      payload = jwt.verify(authorization, 'top-secret');
    }
  } catch (err) {
    return res.status(unauthorized.statusCode).send({ message: 'Authorization required' });
  }
  req.user = payload;

  return next();
};
