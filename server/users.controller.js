const User = require("./models/User");
const bcrypt = require("bcrypt");
const { generate } = require("./helpers/token");

const addUser = async ({ name, surname, email, password }) => {
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Error("Пользователь с таким e-mail уже зарегистрирован!");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name,
    surname: surname,
    email: email,
    password: passwordHash,
  });
  const token = await generate({ id: user.id });

  console.log(`Пользователь ${name} добавлен!`);
  return { user, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Пользователь с таким e-mail не найден...");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Неверный пароль!");
  }

  const token = await generate({ id: user.id });

  return {
    user,
    token,
  };
};

const editUser = async (id, { name, surname, email }) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, surname, email },
    { returnDocument: "after" }
  );
  console.log(`Пользователь с id ${id} изменен!`);
  return updatedUser;
};

module.exports = { addUser, loginUser, editUser };
