const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const {_id: owner}= req.user;
  try {
    const result = await Contact.findByIdAndRemove({contactId, owner});
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
