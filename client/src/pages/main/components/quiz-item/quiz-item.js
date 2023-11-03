import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../../../../selectors";
import { Button } from "../../../../components";
import { useMatch } from "react-router-dom";
import {
  removeQuizAsync,
  setIsEditing,
  setIsShowQuizPage,
  setQuizIdToEdit,
} from "../../../../actions";

const QuizItemContainer = ({
  className,
  id,
  title,
  authorName,
  authorSurname,
  quizLength,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const match = useMatch("/my-quizzes");
  const user = useSelector(selectUser);

  const onQuizRemoveButtonClick = (id, title) => {
    const confirmDelete = window.confirm(
      `Вы действительно хотите удалить тест ${title}?`
    );
    if (confirmDelete) {
      dispatch(setIsEditing(false));
      dispatch(removeQuizAsync(id));
    }
  };

  const onQuizOpenButtonClick = (id) => {
    dispatch(setQuizIdToEdit(id));
    dispatch(setIsShowQuizPage(true));
  };

  const onQuizEditButtonClick = (id) => {
    dispatch(setIsEditing(true));
    dispatch(setQuizIdToEdit(id));
  };

  return (
    <div className={className}>
      <div className="title">{title}</div>
      <div>
        Количество вопросов:
        {quizLength}
      </div>
      {!match && (
        <p>
          Автор: {authorName} {authorSurname}
        </p>
      )}
      Создан: {createdAt}
      <div className="edit-buttons">
        {user && (
          <Button
            onClick={() => onQuizOpenButtonClick(id)}
            width="10rem"
            height="2.5rem"
            fontSize="14px"
          >
            Открыть
          </Button>
        )}

        {user && match && (
          <>
            <Button
              background="blue"
              width="10rem"
              height="2.5rem"
              fontSize="14px"
              onClick={() => {
                onQuizEditButtonClick(id);
              }}
            >
              Редактировать
            </Button>
            <Button
              background="red"
              width="10rem"
              height="2.5rem"
              fontSize="14px"
              onClick={() => onQuizRemoveButtonClick(id, title)}
            >
              Удалить
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const QuizItem = styled(QuizItemContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 15rem;
  min-width: 12rem;
  border-radius: 0.5rem;
  padding: 0 1rem 1rem 1rem;
  background: white;
  overflow: hidden;
  height: 15rem;
  -webkit-box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);
  & .title {
    font-weight: bold;
    font-size: 24px;
    padding: 1rem 0;
  }

  & .edit-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }
`;
