import { ACTION_TYPE } from "../actions";

const initialUserState = null;
// {
//   name: null,
//   surname: null,
//   email: null,
// };

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.LOGOUT:
      return initialUserState;

    default:
      return state;
  }
};
