const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const {checkAvatarUrl} = require("../../helpers")

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");



const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id, avatarURL: oldAvatarUlr } = req.user;

    const image= await Jimp.read(tempUpload);
    image.resize(250,250).write(tempUpload);
   

    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, filename);
    const avatarURL = path.join("avatars", filename);
    
    // Checking Format and deleted old path
    if(checkAvatarUrl(oldAvatarUlr, avatarURL)){
      const oldExtension = oldAvatarUlr.split(".").pop();
      const oldFilename = `${_id}.${oldExtension}`;
      const deletePath = path.join( avatarsDir,oldFilename);
      await fs.unlink(deletePath);
    }
    
    
    
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = updateAvatar;
