const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  addQuestion,
  addResult,
  getQuestionById,
  getQuestions,
  getResults,
  editQuestion,
  deleteQuestion,
} = require("./quiz.controller");

const port = 3005;
const app = express();

app.set("views", "pages");

app.use(cors());
app.use(express.json()); // чтобы была возможность отправлять на сервер данные в формате JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/questions", async (req, res) => {
  const questions = await getQuestions();
  res.send(questions);
  console.log("Список вопросов отправлен");
});
app.get("/questions/:id", async (req, res) => {
  const questionById = await getQuestionById({ id: req.params.id });
  res.send(questionById);
  console.log(`Вопрос с id ${id} отправлен`);
});

app.put("/questions/:id", async (req, res) => {
  try {
    await editQuestion({
      id: req.params.id,
      title: req.body.title,
      answers: req.body.answers,
    });
    const questions = await getQuestions();
    res.send(questions);
  } catch (e) {
    console.log("Ошибка добавления вопроса ", e);
    res.send(e);
  }
});

app.post("/questions", async (req, res) => {
  await addQuestion({
    title: req.body.title,
    answers: req.body.answers,
  });
  const questions = await getQuestions();
  res.send(questions);
});

app.delete("/questions/:id", async (req, res) => {
  await deleteQuestion(req.params.id);
  const questions = await getQuestions();
  res.send(questions);
});

app.get("/results", async (req, res) => {
  const results = await getResults();
  res.send(results);
});

app.post("/results", async (req, res) => {
  console.log(req.body);
  await addResult(req.body.quizResult);
  res.send();
});

mongoose
  .connect(
    "mongodb+srv://p1mka:Maznov0712@cluster0.pmbbp7d.mongodb.net/quiz?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(port, () => console.log("Сервер успешно запущен с портом", port))
  );
