const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

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
    keyword, title, text, date, source, link, image, _id,
  } = req.body;

  const owner = req.body._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  const owner = req.body._id;
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('no article with this id');
      }
      if (!(article.owner === owner)) {
        throw new Forbidden('you can delete only yours articles');
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then((articles) => res.status(200).send({ data: articles }));
    })
    .catch(next);
};
