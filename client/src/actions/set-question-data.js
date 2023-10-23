import { ACTION_TYPE } from "./action-type";

export const setQuestionData = (questionData) => ({
  type: ACTION_TYPE.SET_QUESTION_DATA,
  payload: questionData,
});
