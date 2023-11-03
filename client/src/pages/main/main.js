import { QuizItem } from "./components";
import { Loader } from "../../components";
import { useEffect } from "react";
import { request } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setIsShowQuizPage, setQuizList } from "../../actions";
import {
  selectIsLoading,
  selectIsShowQuizPage,
  selectQuizList,
  selectQuizToEdit,
  selectUser,
} from "../../selectors";
import styled from "styled-components";
import { QuizPage } from "../quiz-page/quiz-page";
import { Link } from "react-router-dom";

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isShowQuizPage = useSelector(selectIsShowQuizPage);
  const quizList = useSelector(selectQuizList);
  const quizId = useSelector(selectQuizToEdit);
  const user = useSelector(selectUser);

  const quizToShow = quizList.find((quiz) => quiz.id === quizId);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setIsShowQuizPage(false));
    request("/quizlist")
      .then((data) => dispatch(setQuizList(data.quizList)))
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  return (
    <div className={className}>
      {isLoading ? (
        <Loader />
      ) : !quizList.length ? (
        <h4>
          Доступных тестов пока нет...{" "}
          {user ? (
            <Link to="/my-quizzes">Создайте первый!</Link>
          ) : (
            <Link to="/login">Создайте первый!</Link>
          )}
        </h4>
      ) : (
        <>
          {!user && (
            <h4>
              <Link to="/login">Войдите</Link> для создания и прохождения тестов{" "}
            </h4>
          )}
          <div className="quiz-block">
            {quizList.map(({ id, title, author, questions, createdAt }) => (
              <QuizItem
                key={id}
                id={id}
                title={title}
                authorName={author.name}
                authorSurname={author.surname}
                quizLength={questions.length}
                createdAt={createdAt}
              />
            ))}
          </div>
        </>
      )}
      {isShowQuizPage && <QuizPage quiz={quizToShow} />}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0 1.5rem;

  & .navigation {
    display: flex;
    align-items: center;
    margin: 1rem auto;
    gap: 1rem;
  }
  & .quiz-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;
