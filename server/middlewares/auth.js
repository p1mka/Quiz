const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function auth(req, res, next) {
  try {
    const token = verify(req.cookies.token);

    const user = await User.findOne({ _id: token.id });

    if (!user) {
      throw new Error("Пользователь не найден!");
    }
    req.user = user;

    next();
  } catch (e) {
    res.send({
      error: e,
    });
  }
};
