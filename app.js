const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const users = require('./routes/users');
const articles = require('./routes/articles');
const { login, addUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./middlewares/PageNotFound');

const { PORT = 3000 } = process.env;
const app = express();

// Нужно реализовать: В production-режиме адрес базы данных берётся из process.env 5.3

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server is about to crash');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(6),
  }),
}), addUser);

app.use('/users', auth, users);
app.use('/articles', auth, articles);

app.use(errorLogger);
app.use(router);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const text = (`An error occurred: ${message}`);
  res.status(statusCode).send({ message: text });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${PORT}`);
});
