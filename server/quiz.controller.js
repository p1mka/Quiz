const Question = require("./models/question");
const Result = require("./models/Result");
const Quiz = require("./models/Quiz");

const getQuizList = async () => {
  const result = await Quiz.find().populate("author").populate("results");
  return result;
};
const getQuestions = async () => {
  const questions = await Question.find();
  return questions;
};

const getQuizById = async ({ id }) => {
  const quiz = await Quiz.findOne({ _id: id }).populate("results");
  return quiz;
};

const editQuiz = async (id, { title, questions }) => {
  const updatedQuiz = await Quiz.findByIdAndUpdate(
    id,
    { title, questions },
    { returnDocument: "after" }
  );
  console.log(`Тест с id ${id} изменен!`);
  return updatedQuiz;
};

const addQuiz = async (title, questions, author) => {
  const result = await Quiz.create({ title, questions, author });

  console.log(`Тест ${title} добавлен!`);

  return result;
};

const getQuizzesByOwner = async ({ author }) => {
  console.log(author);
  const result = await Quiz.find({ author: author })
    .populate("author")
    .populate("results");

  if (result.matchedCount === 0) {
    throw new Error("Нет тестов, созданных этим пользователем");
  }

  return result;
};

const deleteQuiz = async (id) => {
  await Quiz.deleteOne({ _id: id });
  await Result.deleteMany({ quizId: id });
  console.log(`Тест с id ${id} удален`);
};

const getResults = async () => {
  const results = await Result.find();
  console.log("Список результатов отправлен");
  return results;
};

const addResult = async ({ answers, date, quizLength, user, quizId }) => {
  const newResult = await Result.create({
    quizId: quizId,
    date: date,
    quizLength: quizLength,
    answers: answers,
    user: user,
  });
  await Quiz.findByIdAndUpdate(quizId, {
    $push: { results: newResult },
  });
};

module.exports = {
  addQuiz,
  editQuiz,
  addResult,
  getQuestions,
  getQuizById,
  getQuizList,
  getQuizzesByOwner,
  getResults,
  deleteQuiz,
};
