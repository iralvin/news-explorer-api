const articlesRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articlesController");

articlesRouter.get(
  "/articles",
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
  "/articles",
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
  "/articles/:articleId",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      articleId: Joi.string().required(),
    }),
  }),
  deleteArticle
);

module.exports = { articlesRouter };
