const router = require("express").Router();
const { register_post } = require("./controllers/auth");

module.exports = () => {
  router.post("/api/auth/register", register_post);

  return router;
};
