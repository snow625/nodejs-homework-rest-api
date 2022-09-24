const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const {_id: owner}= req.user;

    const {page = 1, limit = 20, favorite=false} = req.query;
    const skip = (page - 1) * limit;

    const findParams = favorite? {owner, favorite}: {owner};

    const result = await Contact.find(findParams, " -updatedAt", {skip, limit})
                          .populate("owner", "email")
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
