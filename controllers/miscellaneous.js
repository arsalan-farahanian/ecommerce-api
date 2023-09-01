const Contact = require("../models/Contact");

module.exports = {
  contactus_get: async (req, res, next) => {
    let page = +req.query.page || 1; // getting what page the user is on
    page = page >= 1 ? page : 1; // preventing explicit negative pages

    let limit = +req.query.limit || 5;
    limit = limit >= 5 ? limit : 5;

    let contacts = await Contact.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    res.status(200).json({
      msg: "contacts were fetched",
      contacts: contacts,
      page: page,
      count: contacts.length,
    });
  },
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
