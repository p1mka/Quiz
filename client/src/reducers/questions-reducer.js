import { ACTION_TYPE } from "../actions";

const initialQuestionsState = [
  { _id: String(Date.now()), title: "", answers: [], isNowCreated: true },
];

export const questionsReducer = (state = initialQuestionsState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_QUESTIONS:
      return [...action.payload];
    case ACTION_TYPE.ADD_QUESTION: {
      return [...state, ...initialQuestionsState];
    }
    default:
      return state;
  }
};
