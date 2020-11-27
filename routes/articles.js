const articlesRouter = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articlesController");

articlesRouter.get("/articles", getArticles);

articlesRouter.post("/articles", createArticle);

articlesRouter.delete("/articles/:articleId", deleteArticle);

module.exports = { articlesRouter };
