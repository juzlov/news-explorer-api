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
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const { PORT = 3000, DB_PATH, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(6),
  }),
}), addUser);

app.use('/users', auth, users);
app.use('/articles', auth, articles);

app.use(errorLogger);
app.use(router);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
