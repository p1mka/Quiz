import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setQuizResults } from "./set-quiz-results";

export const getQuizResultAsync = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  await request("/results")
    .then((loadedResults) => {
      dispatch(setQuizResults(loadedResults));
      return loadedResults;
    })

    .finally(() => dispatch(setIsLoading(false)));
};
