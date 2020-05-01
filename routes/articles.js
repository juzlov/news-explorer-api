const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getArticles, postArticle, removeArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),

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

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
}), removeArticle);

module.exports = router;
