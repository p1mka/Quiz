import { ACTION_TYPE } from "../actions";

const initialAppState = {
  isLoading: false,
  isEditing: false,
  serverError: null,
  quizList: [],
  quizIdToEdit: "",
  quizResults: [],
  isShowQuizPage: false,
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
    case ACTION_TYPE.SET_SERVER_ERROR:
      return { ...state, serverError: action.payload };

    case ACTION_TYPE.SET_QUIZ_LIST:
      return { ...state, quizList: action.payload };

    case ACTION_TYPE.SET_IS_EDITING:
      return { ...state, isEditing: action.payload };

    case ACTION_TYPE.SET_QUIZ_ID_TO_EDIT:
      return { ...state, quizIdToEdit: action.payload };

    case ACTION_TYPE.SET_IS_SHOW_QUIZ_PAGE:
      return { ...state, isShowQuizPage: action.payload };

    default:
      return state;
  }
};
