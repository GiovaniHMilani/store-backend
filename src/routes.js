const routes = require("express").Router();

const authMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");

routes.post("/sessions", SessionController.store);
routes.post("/register", UserController.store);

module.exports = routes;
