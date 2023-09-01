const router = require("express").Router();
//controllers
const shopCon = require("./controllers/shop");
const authCon = require("./controllers/auth");
const misCon = require("./controllers/miscellaneous");

//validators
const register_validator = require("./validators/register_validator");
const contactus_validator = require("./validators/contactus_validator");

module.exports = () => {
  //products
  router.get("/api/product", shopCon.products_get);
  router.get("/api/product/:id", shopCon.productById_get);
  router.delete("/api/product/:id", shopCon.productById_delete); //requires AuthZ

  //auth
  router.post("/api/auth/register", register_validator, authCon.register_post);

  //contact us
  router.get("/api/contact", misCon.contactus_get); // requires admin auth
  router.post("/api/contact", contactus_validator, misCon.contactus_post);

  return router;
};
