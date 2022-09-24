const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const {_id: owner}= req.user;
  try {
     const result = await Contact.findOne({_id: contactId, owner,}, "-updatedAt");
    // const result = await Contact.findById(contactId, " -updatedAt");
    // const result = await Contact.findOne({_id: id}, "-createdAt -updatedAt");
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
