import { setQuestions } from "./set-questions";

export const saveQuestionAsync = (id, title, answer) => (dispatch) => {
  fetch(`http://localhost:3005/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title,
      answers: answer,
    }),
  })
    .then((res) => res.json())
    .then((questionsData) => {
      console.log(questionsData);
      dispatch(setQuestions(questionsData));
      return questionsData;
    });
};
