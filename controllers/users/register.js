const { User } = require("../../models/user");
const { RequestError, sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const {BASE_URL} = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });

    const mail = {
      to: email,
      subject: "Подтверждение регистрации на сайте",
      html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Нажмите для подтверждения регистрации</a>`
  };
  await sendMail(mail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        verificationToken: result.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
