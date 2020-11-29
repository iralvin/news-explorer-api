const usersRouter = require("express").Router();
const { celebrate, Joi, CelebrateError } = require("celebrate");
const { getCurrentUser } = require("../controllers/usersController");

usersRouter.get(
  "/users/me",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getCurrentUser
);

module.exports = { usersRouter };
