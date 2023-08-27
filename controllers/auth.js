const User = require("../models/User");

module.exports = {
  register_post: async (req, res, next) => {
    const { firstname, lastname, email, password, receiveNewsLetters } =
      req.body;

    try {
      await User.add({
        firstname,
        lastname,
        email,
        password,
        receiveNewsLetters,
      });
      res.status(201).json({ msg: "user created" });
    } catch (err) {
      next(err);
    }
  },
};
