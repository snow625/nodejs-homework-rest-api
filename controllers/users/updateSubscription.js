const {User} = require("../../models/user");

const updateSubscription = async(req, res, next) => {
    try {
        const {_id} = req.user;
        const {subscription} = req.body;

        await User.findByIdAndUpdate(_id, {subscription});
        // для валидации схемы через Mongoos нужно 
        // await User.findByIdAndUpdate(_id, {subscription}, { runValidators: true });
         res.json(`subscription was updated to "${subscription}"`);
      } catch (error) {
        next(error);
      }
   
}
module.exports = updateSubscription;