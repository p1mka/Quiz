import { ACTION_TYPE } from "../actions";

const initialAppState = {
  isLoading: false,
  quizResults: [],
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTION_TYPE.SET_QUIZ_RESULTS:
      return {
        ...state,
        quizResults: action.payload,
      };

    default:
      return state;
  }
};
