import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import {
  appReducer,
  questionReducer,
  questionsReducer,
  userReducer,
} from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  question: questionReducer,
  questions: questionsReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
