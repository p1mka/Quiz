import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setQuizList } from "./set-quiz-list";
// import { setQuestions } from "./set-questions";

export const addQuizAsync = (newQuizData) => (dispatch) => {
  dispatch(setIsLoading(true));
  request(`/quizlist`, "POST", newQuizData)
    .then(({ error, quizList }) => dispatch(setQuizList(quizList)))
    .finally(() => dispatch(setIsLoading(false)));
};
