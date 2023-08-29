const { check, validationResult } = require("express-validator");

module.exports = [
  check("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name cannot have under 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name cannot have more than 50 characters"),
  check("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Invalid Email Address"),

  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invalid Phone Number"),
  check("typeOfRequest")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Type of request is invalid"),
  check("message")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Message body cannot contain less than 10 characters")
    .isLength({ max: 2000 })
    .withMessage("Message body cannot contain more than 10 characters"),
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
