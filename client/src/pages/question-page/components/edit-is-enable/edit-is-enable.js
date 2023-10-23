import { useState } from "react";
import { Button, Input, Loader } from "../../../../components";
import {
  addQuestionAsync,
  saveQuestionAsync,
  setIsLoading,
} from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectIsLoading } from "../../../../selectors";

const EditIsEnableContainer = ({
  className,
  title,
  answers,
  questionId,
  setIsEditing,
  isNowCreated,
}) => {
  const [error, setError] = useState(null);
  const [questionTitle, setQuestionTitle] = useState(title);
  const [answer, setAnswer] = useState(answers);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onQuestionTitleChange = ({ target }) => {
    setQuestionTitle(target.value);
    setError(null);
  };

  const onAnswerChange = (answerId, newValue) => {
    setError(null);
    setAnswer((a) => {
      return a.map((item) =>
        item.id === answerId ? { ...item, description: newValue } : item
      );
    });
  };
  const onAddAnswerButtonClick = () =>
    setAnswer([...answer, { id: String(Date.now()), description: "" }]);

  const onRemoveAnswerButtonClick = (answerId) => {
    const filteredAnswers = answer.filter((a) => a.id !== answerId);
    setAnswer(filteredAnswers);
  };

  const onCheckRightAnswerButtonClick = (answerId, isRight = false) =>
    setAnswer((a) => {
      return a.map((item) =>
        item.id === answerId ? { ...item, isRight: !isRight } : item
      );
    });

  const onGoBackButtonClick = () => {
    setIsEditing(false);
  };

  const onSaveButtonClick = () => {
    console.log(answer);
    if (!questionTitle) {
      setError("Вопрос не должен быть пустым!");
    } else if (!answer.length) {
      setError("Добавьте хотя бы один вариант ответа!");
    } else if (!answer[0].description) {
      setError("Ответ не должен быть пустым!");
    } else if (!answer[0].isRight) {
      setError("Укажите ответ, который является верным!");
    } else {
      setError(null);
      dispatch(setIsLoading(true));
      isNowCreated
        ? dispatch(addQuestionAsync(questionId, questionTitle, answer))
        : dispatch(saveQuestionAsync(questionId, questionTitle, answer));
      setIsEditing(false);
      dispatch(setIsLoading(false));
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={className}>
      <Input
        value={questionTitle}
        onChange={onQuestionTitleChange}
        required={true}
      />
      {!!error && <div>{error}</div>}

      <div className="answers">
        <h4>Варианты ответов</h4>
        {answer &&
          answer.map(({ id: answerId, description, isRight }) => (
            <div key={answerId} id={answerId} className="answer-block">
              <Input
                className="answer"
                defaultValue={description}
                onChange={({ target }) =>
                  onAnswerChange(answerId, target.value)
                }
              />
              <div className="answer-edit-buttons">
                <Button
                  fontSize="18px"
                  width="100%"
                  height="50%"
                  background="green"
                  onClick={() =>
                    onCheckRightAnswerButtonClick(answerId, isRight)
                  }
                >
                  {isRight ? "✓" : "●"}
                </Button>
                <Button
                  fontSize="18px"
                  width="auto"
                  height="50%"
                  background="red"
                  onClick={() => onRemoveAnswerButtonClick(answerId)}
                >
                  &times;
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Button
        width="14%"
        background="rgb(134 214 132)"
        onClick={onAddAnswerButtonClick}
      >
        +
      </Button>
      <div className="operation-panel">
        {!isNowCreated && (
          <Button fontSize="18px" onClick={onGoBackButtonClick}>
            Назад
          </Button>
        )}
        <Button
          fontSize="18px"
          background="rgb(134 214 132)"
          onClick={onSaveButtonClick}
          disabled={!!error}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export const EditIsEnable = styled(EditIsEnableContainer)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 1rem;

  & .answers {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-direction: column;
  }

  & .answer-block {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    font-size: 24px;
  }

  & .answer {
    display: flex;
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 20px;
  }

  & .operation-panel {
    display: flex;
    gap: 1rem;
  }

  & .answer-edit-buttons {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.25rem;
  }

  & h4 {
    margin-bottom: 0;
  }
`;
