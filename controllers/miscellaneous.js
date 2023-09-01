const Contact = require("../models/Contact");

module.exports = {
  contactus_get: async (req, res, next) => {
    let page = +req.query.page || 1; // getting what page the user is on
    page = page >= 1 ? page : 1; // preventing explicit negative pages

    let limit = +req.query.limit || 5;
    limit = limit >= 5 ? limit : 5;
    try {
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
    } catch (err) {
      next(err);
    }
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

  contact_get: async (req, res, next) => {
    let contactId = req.params.id;

    try {
      let contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ msg: "Contact not found" });
      }
      res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  },

  contact_delete: async (req, res, next) => {
    let contactId = req.params.id;
    try {
      await Contact.findByIdAndDelete(contactId);
      res.status(204).json({ msg: "Contact was deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
