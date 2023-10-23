import { setIsLoading } from "./set-is-loading";

export const sendQuizResultAsync = (quizResult) => (dispatch) => {
  dispatch(setIsLoading(true));
  fetch("http://localhost:3005/results", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      quizResult,
    }),
  }).finally(() => dispatch(setIsLoading(false)));
};
