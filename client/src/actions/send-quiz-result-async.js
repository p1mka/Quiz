import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setQuizList } from "./set-quiz-list";

export const sendQuizResultAsync = (quizResult) => (dispatch) => {
  dispatch(setIsLoading(true));
  request("/results", "POST", quizResult)
    .then(({ error, quizList }) => {
      dispatch(setQuizList(quizList));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
