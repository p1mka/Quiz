import { ACTION_TYPE } from "./action-type";

export const setIsEditing = (isEditing) => ({
  type: ACTION_TYPE.SET_IS_EDITING,
  payload: isEditing,
});
