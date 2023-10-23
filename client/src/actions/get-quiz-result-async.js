import { setIsLoading } from "./set-is-loading";
import { setQuizResults } from "./set-quiz-results";

export const getQuizResultAsync = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  await fetch("http://localhost:3005/results")
    .then((res) => res.json())
    .then((loadedResults) => {
      dispatch(setQuizResults(loadedResults));
      return loadedResults;
    })

    .finally(() => dispatch(setIsLoading(false)));
};
