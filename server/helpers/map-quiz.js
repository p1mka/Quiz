const convertDate = require("./convert-date");

module.exports = function (quiz) {
  return quiz.map((item) => {
    return {
      id: item.id,
      title: item.title,
      questions: item.questions,
      author: {
        name: item.author.name,
        surname: item.author.surname,
        email: item.author.email,
      },
      results: item.results,
      createdAt: convertDate(item.createdAt),
    };
  });
};
