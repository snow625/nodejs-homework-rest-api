const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
