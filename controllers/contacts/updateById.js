const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const {_id: owner}= req.user;

    const result = await Contact.findByIdAndUpdate({contactId, owner}, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateById;
