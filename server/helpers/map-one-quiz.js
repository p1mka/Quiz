const convertDate = require("./convert-date");

module.exports = function (quiz) {
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions,
    author: quiz.author,
    results: quiz.results,
    createdAt: convertDate(quiz.createdAt),
  };
};
