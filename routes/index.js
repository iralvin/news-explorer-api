const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/usersController');
const { auth } = require('../middleware/auth');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');

mainRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
mainRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
  createUser,
);

mainRouter.use(auth);

mainRouter.use('/', usersRouter);
mainRouter.use('/', articlesRouter);

module.exports = { mainRouter };
