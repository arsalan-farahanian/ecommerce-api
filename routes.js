const router = require("express").Router();
//controllers
const shopCon = require("./controllers/shop");
const authCon = require("./controllers/auth");
const { contactus_post } = require("./controllers/miscellaneous");

//validators
const register_validator = require("./validators/register_validator");
const contactus_validator = require("./validators/contactus_validator");

module.exports = () => {
  //products
  router.get("/api/product", shopCon.products_get);
  router.get("/api/product/:id", shopCon.productById_get);

  //auth
  router.post("/api/auth/register", register_validator, authCon.register_post);

  router.post("/api/contactus", contactus_validator, contactus_post);
  return router;
};
