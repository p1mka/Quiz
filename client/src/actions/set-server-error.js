import { ACTION_TYPE } from "./action-type";

export const setServerError = (error) => ({
  type: ACTION_TYPE.SET_SERVER_ERROR,
  payload: error,
});
