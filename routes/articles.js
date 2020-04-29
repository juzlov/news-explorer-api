const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getArticles, postArticle, removeArticle } = require('../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Invalid link');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Invalid image link');
    }),
  }),
}), postArticle);

router.delete('/articles/articleId', removeArticle);

module.exports = router;
