import { ACTION_TYPE } from "./action-type";

export const setQuizIdToEdit = (id) => ({
  type: ACTION_TYPE.SET_QUIZ_ID_TO_EDIT,
  payload: id,
});
