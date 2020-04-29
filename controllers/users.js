const bcrypt = require('bcryptjs');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');


module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((me) => {
      if (!me) {
        throw new NotFoundError('User identification error');
      }
      res.status(200).send({ data: me });
    })
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const unauthorized = new Unauthorized('');

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') {
        res.status(unauthorized.statusCode).send({ message: 'Email already registred' });
      }
    })
    .catch(next);
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'top-secret');
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send();
    })
    .catch(next);
};
