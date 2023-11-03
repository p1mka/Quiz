import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setQuizList } from "./set-quiz-list";

export const saveQuizAsync = (newQuizData) => (dispatch) => {
  dispatch(setIsLoading(true));
  request(`/quizlist/${newQuizData.id}`, "PATCH", newQuizData)
    .then(({ error, quizList }) => {
      dispatch(setQuizList(quizList));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
