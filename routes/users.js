const usersRouter = require("express").Router();
const { getCurrentUser } = require("../controllers/usersController");

usersRouter.get("/users/me", getCurrentUser);

module.exports = { usersRouter };
