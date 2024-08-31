const routes = require("express").Router();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const attributeRoutes = require("./attributeRoutes");

//common endpoint for product related APIs.
routes.use("/product", productRoutes);
routes.use("/category", categoryRoutes);
routes.use("/attribute", attributeRoutes);

module.exports = routes;
