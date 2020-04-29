const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const ReqError = require('../errors/ReqError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError('No articles were found');
      }
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image,
  })
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new ReqError('no article with this id');
      }
      if (!article.owner.equals(req.user._id)) {
        throw new Forbidden('you can delete only yours articles');
      }
      Article.findByIdAndDelete(req.params.cardId)
        .then((articles) => res.status(200).send({ data: articles }));
    })
    .catch(next);
};
