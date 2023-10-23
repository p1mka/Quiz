import { ACTION_TYPE } from "../actions";

const initialQuestionState = {
  id: "",
  title: "",
  answers: [],
};

export const questionReducer = (state = initialQuestionState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_QUESTION_DATA: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
