import { ACTION_TYPE } from "./action-type";

export const setQuizResults = (results) => ({
  type: ACTION_TYPE.SET_QUIZ_RESULTS,
  payload: results || [],
});
