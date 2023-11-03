require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const auth = require("./middlewares/auth");

const {
  addQuiz,
  getQuizzesByOwner,
  addResult,
  getQuizList,
  getQuizById,
  getQuestions,
  getResults,
  editQuiz,
  deleteQuiz,
} = require("./quiz.controller");
const { addUser, loginUser, editUser } = require("./users.controller");
const mapUser = require("./helpers/map-user");
const mapQuiz = require("./helpers/map-quiz");
const mapOneQuiz = require("./helpers/map-one-quiz");

const port = 3005;
const app = express();

app.set("views", "pages");
app.use(express.static("../client/build"));

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/quizlist", async (req, res) => {
  const quizList = await getQuizList();

  res.send({ error: null, quizList: mapQuiz(quizList) });
  console.log("Список тестов отправлен!");
});

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await addUser(req.body.userData);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ user: mapUser(user), error: null });
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ user: mapUser(user), error: null });
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null });
});

app.use(auth);

app.get("/myquizlist", async (req, res) => {
  try {
    const quizList = await getQuizzesByOwner({
      author: req.user.id,
    });
    res.send({ error: null, quizList: mapQuiz(quizList) });
  } catch (e) {
    console.log("Ошибка запроса ", e);
    res.send({ error: e, quizList: null });
  }
});

app.post("/quizlist", async (req, res) => {
  await addQuiz(req.body.title, req.body.questions, req.user.id);
  const quizList = await getQuizzesByOwner({
    author: req.user.id,
  });
  res.send({ error: null, quizList: mapQuiz(quizList) });
});

app.patch("/quizlist/:id", async (req, res) => {
  try {
    await editQuiz(req.params.id, {
      title: req.body.title,
      questions: req.body.questions,
    });
    const quizList = await getQuizzesByOwner({
      author: req.user.id,
    });
    res.send({ error: null, quizList: mapQuiz(quizList) });
  } catch (e) {
    console.log("Ошибка добавления вопроса ", e);
    res.send(e);
  }
});

app.delete("/quizlist/:id", async (req, res) => {
  await deleteQuiz(req.params.id);
  const quizList = await getQuizzesByOwner({
    author: req.user.id,
  });
  res.send({ error: null, quizList: mapQuiz(quizList) });
});

app.get("/quizlist/:id", async (req, res) => {
  const result = await getQuizById({ id: req.params.id });
  res.send({ error: null, quiz: mapOneQuiz(result) });
  console.log(`Тест с id ${req.params.id} отправлен`);
});

app.post("/results", async (req, res) => {
  await addResult({
    answers: req.body.answers,
    date: req.body.date,
    quizLength: req.body.quizLength,
    quizId: req.body.quizId,
    user: { name: req.user.name, surname: req.user.surname },
  });
  const quizList = await getQuizzesByOwner({
    author: req.user.id,
  });
  res.send({ error: null, quizList: mapQuiz(quizList) });
});

app.patch("/users/:id", async (req, res) => {
  try {
    const userData = await editUser(req.params.id, {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });
    res.send({ error: null, userData });
  } catch (e) {
    console.log("Ошибка изменения пользователя ", e);
    res.send({ error: e, userData: null });
  }
});

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

app.get("/results", async (req, res) => {
  const results = await getResults(req.body.id);
  res.send({ error: null, results });
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() =>
    app.listen(port, () => console.log("Сервер успешно запущен с портом", port))
  );
