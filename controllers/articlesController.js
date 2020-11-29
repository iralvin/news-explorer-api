const Article = require("../models/article");
const NotFoundError = require("../error/NotFoundError");

const getArticles = (req, res, next) => {
  Article.find({owner: req.user._id})
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError("Failed to get articles", 500);
      }
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Failed to create article", 400);
      }
      res.send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findOne({ _id: articleId })
    .select("+owner")
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Failed to find card data", 404);
      }

      if (article.owner == req.user._id) {
        Article.deleteOne({ _id: articleId }).then((article) => {
          res.send({ message: "successfully deleted article" });
        });
      } else {
        throw new NotFoundError("User not authorized to delete card", 404);
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
