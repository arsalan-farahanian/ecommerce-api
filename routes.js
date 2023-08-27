const router = require("express").Router();
//controllers
const { register_post } = require("./controllers/auth");

//validators
const register_validator = require("./validators/register_validator");

module.exports = () => {
  router.post("/api/auth/register", register_validator, register_post);

  return router;
};
