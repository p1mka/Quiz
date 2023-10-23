import { setIsLoading } from "./set-is-loading";
import { setQuestions } from "./set-questions";

export const getQuestionsAsync = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  await fetch(`http://localhost:3005/questions`)
    .then((res) => res.json())
    .then((loadedQuestions) => {
      dispatch(setQuestions(loadedQuestions));
      return loadedQuestions;
    })
    .finally(() => dispatch(setIsLoading(false)));
};
