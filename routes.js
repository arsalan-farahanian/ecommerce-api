const router = require("express").Router();
//controllers
const shopCon = require("./controllers/shop");
const authCon = require("./controllers/auth");
const miscCon = require("./controllers/miscellaneous");

//user input validators for POST requests
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
  router.get("/api/contact", miscCon.contactus_get); // requires admin auth
  router.post("/api/contact", contactus_validator, miscCon.contactus_post);
  router.get("/api/contact/:id", miscCon.contact_get); //requires admin auth
  router.delete("/api/contact/:id", miscCon.contact_delete); //requires admin auth

  return router;
};
