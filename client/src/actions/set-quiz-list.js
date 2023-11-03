import { ACTION_TYPE } from "./action-type";

export const setQuizList = (quizList) => ({
  type: ACTION_TYPE.SET_QUIZ_LIST,
  payload: quizList || [],
});
