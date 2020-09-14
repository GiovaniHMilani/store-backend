const routes = require("express").Router();

const authMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const ProductController = require("./app/controllers/ProductController");
const SaleController = require("./app/controllers/SaleController");

routes.post("/sessions", SessionController.store);
routes.post("/register", UserController.store);

routes.get("/products", authMiddleware, ProductController.list);
routes.get("/product/:id", authMiddleware, ProductController.index);
routes.post("/new-product", authMiddleware, ProductController.store);
routes.put("/edit-product/:id", authMiddleware, ProductController.edit);

routes.get("/sales", authMiddleware, SaleController.list);
routes.post("/sale", authMiddleware, SaleController.store);

module.exports = routes;
