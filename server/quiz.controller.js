const Question = require("./models/question");
const Result = require("./models/result");

const getQuestions = async () => {
  const questions = await Question.find();
  return questions;
};

const getQuestionById = async ({ id }) => {
  const question = await Question.findOne({ _id: id });
  return question;
};

const editQuestion = async ({ id, title, answers }) => {
  const updatedQuestion = await Question.updateOne(
    { _id: id },
    { title: title, answers: answers }
  );
  console.log(`Ответ с id ${id} изменен!`);
  return updatedQuestion;
};

const addQuestion = async ({ title, answers }) => {
  await Question.create({ title: title, answers: answers });
  console.log(`Вопрос ${title} добавлен!`);
};

const deleteQuestion = async (id) => {
  await Question.deleteOne({ _id: id });
  console.log(`Вопрос с id ${id} удален`);
};

const getResults = async () => {
  const results = await Result.find();
  console.log("Список результатов отправлен");
  return results;
};

const addResult = async ({ date, quizLength, answers }) => {
  await Result.create({ date: date, quizLength: quizLength, answers: answers });
};

module.exports = {
  addQuestion,
  addResult,
  getQuestions,
  getQuestionById,
  getResults,
  editQuestion,
  deleteQuestion,
};
