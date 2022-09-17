const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(`contactId: ${contactId}`);
  try {
    const result = await Contact.findById(contactId, " -updatedAt");
    // const result = await Book.findOne({_id: id}, "-createdAt -updatedAt");
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
