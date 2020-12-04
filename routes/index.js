const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/usersController');
const { auth } = require('../middleware/auth');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');
const pageNotFound = require('./pageNotFound');

mainRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
mainRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().alphanum().min(8),
      name: Joi.string().required(),
    }),
  }),
  createUser,
);

mainRouter.use(auth);

mainRouter.use('/', usersRouter);
mainRouter.use('/', articlesRouter);
mainRouter.use('/', pageNotFound);

module.exports = { mainRouter };
