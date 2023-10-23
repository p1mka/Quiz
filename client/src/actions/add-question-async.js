import { setIsLoading } from "./set-is-loading";
import { setQuestions } from "./set-questions";

export const addQuestionAsync = (id, title, answer) => (dispatch) => {
  dispatch(setIsLoading(true));
  fetch(`http://localhost:3005/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      id,
      title,
      answers: answer,
    }),
  })
    .then((res) => res.json())
    .then((questionsData) => {
      dispatch(setQuestions(questionsData));
      return questionsData;
    })
    .finally(() => dispatch(setIsLoading(false)));
};
