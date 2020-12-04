/* eslint-disable eqeqeq */
const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthError = require('../errors/NotAuthError');
const PostError = require('../errors/PostError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError();
      }
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new PostError();
      }
      res.send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findOne({ _id: articleId })
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError();
      }

      if (article.owner == req.user._id) {
        Article.deleteOne({ _id: articleId }).then(() => {
          res.send({ message: 'successfully deleted article' });
        });
      } else {
        throw new NotAuthError();
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
