module.exports = function (user) {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
};
