const Contact = require("../models/Contact");

module.exports = {
  contactus_post: async (req, res, next) => {
    const { name, email, phone, typeOfRequest, message } = req.body;
    try {
      await Contact.add({
        name,
        email,
        phone,
        typeOfRequest,
        message,
      });
      res.status(201).json({ msg: "Message sent successfully" });
    } catch (err) {
      next(err);
    }
  },
};
