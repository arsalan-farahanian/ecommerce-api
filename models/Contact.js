const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    typeOfRequest: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

contactSchema.statics.add = async function (newContact) {
  try {
    return this.create(newContact);
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Contact", contactSchema);
