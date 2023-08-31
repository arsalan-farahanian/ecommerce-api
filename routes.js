const router = require("express").Router();
//controllers
const { register_post } = require("./controllers/auth");
const { contactus_post } = require("./controllers/miscellaneous");

//validators
const register_validator = require("./validators/register_validator");
const contactus_validator = require("./validators/contactus_validator");

module.exports = () => {
  //auth
  router.post("/api/auth/register", register_validator, register_post);

  router.post("/api/contactus", contactus_validator, contactus_post);
  return router;
};
