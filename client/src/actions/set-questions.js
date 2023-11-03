import { ACTION_TYPE } from "./action-type";

export const setQuestions = (questions) => {
  return {
    type: ACTION_TYPE.SET_QUESTIONS,
    payload: questions,
  };
};
