const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: function typeValidate(url) {
      return validator.isURL(url);
    },
  },
  image: {
    type: String,
    required: true,
    validate: function typeValidate(image) {
      return validator.isURL(image);
    },
  },
  //Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);