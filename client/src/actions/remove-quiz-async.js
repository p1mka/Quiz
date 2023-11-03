import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setQuizList } from "./set-quiz-list";

export const removeQuizAsync = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  request(`/quizlist/${id}`, "DELETE")
    .then(({ error, quizList }) => {
      dispatch(setQuizList(quizList));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
