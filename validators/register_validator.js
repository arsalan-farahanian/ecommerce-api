const { check, validationResult } = require("express-validator");
const User = require("../models/User");

module.exports = [
  check("firstname")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name cannot have under 3 characters"),
  check("lastname")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name cannot have under 3 characters"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (value) => {
      let user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email Already Exists");
      }

      return true;
    }),

  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Password cannot be less than 3 characters"),
  check("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  // validator function
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Unprocessable entity
      return res.status(422).json(errors.array());
    }

    next();
  },
];
