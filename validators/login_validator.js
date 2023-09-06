const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = [
  check("email").trim().escape().normalizeEmail().isEmail(),
  check("password")
    .trim()
    .escape()
    .trim()
    .custom(async (value, { req }) => {
      let user = await User.findOne({ email: req.body.email })
        .select("password")
        .exec();
      if (!user) {
        throw new Error("Invalid email or password");
      }

      let result = await bcrypt.compare(value, user.password);
      if (!result) {
        throw new Error("Invalid email or password");
      }

      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Unprocessable entity
      return res.status(422).json(errors.array());
    }
    next();
  },
];
