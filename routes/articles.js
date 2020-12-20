const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articlesController');

articlesRouter.get(
  '/articles/:userId',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getArticles
);

articlesRouter.post(
  '/articles/:userId',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
      source: Joi.string().required(),
    }),
  }),
  createArticle
);

articlesRouter.delete(
  '/articles/:userId/:articleId',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      userId: Joi.string().required(),
      articleId: Joi.string().required(),
    }),
  }),
  deleteArticle
);

module.exports = { articlesRouter };
