import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setIsShowQuizPage, setQuizList } from "../../actions";
import { request } from "../../utils";
import {
  selectIsEditing,
  selectIsLoading,
  selectIsShowQuizPage,
  selectQuizList,
  selectQuizToEdit,
  selectUser,
} from "../../selectors";
import { QuizItem } from "../main/components";
import { Button, SimpleLoader } from "../../components";
import { QuizCreate, QuizEdit } from "./components";
import { QuizPage } from "../quiz-page/quiz-page";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyQuizzesContainer = ({ className, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const quizList = useSelector(selectQuizList);
  const isEditing = useSelector(selectIsEditing);
  const isShowQuizPage = useSelector(selectIsShowQuizPage);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const quizId = useSelector(selectQuizToEdit);
  const quizToShow = quizList.find((quiz) => quiz.id === quizId);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setIsShowQuizPage(false));
    request("/myquizlist")
      .then(({ error, quizList }) => {
        if (error) {
          setError(error);
          return;
        }
        dispatch(setQuizList(quizList));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch, user, navigate]);

  const onCreateQuizButtonClick = () => {
    setIsCreating(true);
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <div className={className} {...props}>
      <div className="navigation">
        <h2> Мои тесты</h2>
        <Button
          onClick={onCreateQuizButtonClick}
          width="10rem"
          height="3rem"
          fontSize="16px"
          disabled={isCreating}
        >
          Создать тест
        </Button>
      </div>

      {isLoading ? (
        <SimpleLoader />
      ) : (
        <>
          {!quizList.length && <h3>Вы пока не создали ни одного теста...</h3>}
          {isCreating && <QuizCreate setIsCreating={setIsCreating} />}
          {isEditing && !isCreating && <QuizEdit quizList={quizList} />}
          <div className="quizzes-list" {...props}>
            {quizList.map(({ id, title, questions, createdAt }) => (
              <QuizItem
                key={id}
                id={id}
                title={title}
                quizLength={questions.length}
                createdAt={createdAt}
              />
            ))}
            {isShowQuizPage && (
              <QuizPage quiz={quizToShow} results={quizList.results} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const MyQuizzes = styled(MyQuizzesContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 1.5rem;
  gap: 1.5rem;

  & .navigation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 1.5rem;
    border-radius: 0.5rem;
    background: #f1f1f1;
  }

  & .quizzes-list {
    display: flex;
    flex-direction: ${({ isEditing }) => (isEditing ? "column" : "row")};
    gap: 1rem;
    flex-wrap: wrap;
  }
`;
