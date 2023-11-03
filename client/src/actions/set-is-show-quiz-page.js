import { ACTION_TYPE } from "./action-type";

export const setIsShowQuizPage = (isShowQuizPage) => ({
  type: ACTION_TYPE.SET_IS_SHOW_QUIZ_PAGE,
  payload: isShowQuizPage,
});
