import { Button, Input, Loader } from "../../../../components";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../../selectors";
import styled from "styled-components";
import { useState } from "react";

const EditIsEnableContainer = ({
  className,
  question,
  questionNumber,
  newQuizData,
  setNewQuizData,
  setErrors,
}) => {
  const { questionId, questionTitle, answers, isNowCreated } = question;

  const isLoading = useSelector(selectIsLoading);

  const [quiestionIsEditing, setQuestionIsEditing] = useState(false);

  const onQuestionTitleChange = ({ target }) => {
    setErrors(null);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions];
      updatedQuestions[questionNumber] = {
        ...updatedQuestions[questionNumber],
        questionTitle: target.value,
      };
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onRemoveQuestionButtonClick = () => {
    setErrors(null);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions].filter((q) => {
        return q.questionId !== questionId;
      });
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onAddAnswerButtonClick = () => {
    setErrors(null);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions];
      updatedQuestions[questionNumber] = {
        ...updatedQuestions[questionNumber],
        answers: [
          ...updatedQuestions[questionNumber].answers,
          { id: Date.now(), description: "", isRight: false },
        ],
      };
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onAnswerChange = (idx, newValue) => {
    setErrors(null);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions];
      const updatedAnswers = [...updatedQuestions[questionNumber].answers];

      updatedAnswers[idx].description = newValue;
      updatedQuestions[questionNumber] = {
        ...updatedQuestions[questionNumber],
        answers: updatedAnswers,
      };
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onRemoveAnswerButtonClick = (answerId) => {
    setErrors(null);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions];
      const updatedAnswers = [
        ...updatedQuestions[questionNumber].answers,
      ].filter((a) => a.id !== answerId);

      updatedQuestions[questionNumber] = {
        ...updatedQuestions[questionNumber],
        answers: updatedAnswers,
      };
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onCheckRightAnswerButtonClick = (idx, isRight = false) => {
    setErrors([]);
    setNewQuizData(() => {
      const updatedQuestions = [...newQuizData.questions];
      const updatedAnswers = [...updatedQuestions[questionNumber].answers];

      updatedAnswers[idx].isRight = !isRight;
      updatedQuestions[questionNumber] = {
        ...updatedQuestions[questionNumber],
        answers: updatedAnswers,
      };
      return { ...newQuizData, questions: updatedQuestions };
    });
  };

  const onEditQuestionButtonClick = () =>
    setQuestionIsEditing(!quiestionIsEditing);

  // const onGoBackButtonClick = () => {
  //   setIsEditing(false);
  // };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={className}>
      <i onClick={onEditQuestionButtonClick} className="edit-icon">
        {quiestionIsEditing ? "▲" : "▼"}
      </i>
      <h4>Вопрос № {questionNumber + 1}</h4>
      <i onClick={() => onRemoveQuestionButtonClick()}>&times; </i>
      {!quiestionIsEditing && !isNowCreated ? (
        <div>{questionTitle}</div>
      ) : (
        <>
          <Input
            placeholder="Введите вопрос..."
            value={questionTitle}
            onChange={onQuestionTitleChange}
            required={true}
          />

          <div className="answers">
            <h4>Варианты ответов</h4>
            {answers &&
              answers.map(({ id: answerId, description, isRight }, idx) => (
                <div key={answerId} id={answerId} className="answer-block">
                  <Input
                    placeholder="Введите ответ..."
                    className="answer"
                    defaultValue={description}
                    onChange={({ target }) => onAnswerChange(idx, target.value)}
                    required={true}
                  />
                  <div className="answer-edit-buttons">
                    <Button
                      fontSize="18px"
                      width="100%"
                      height="50%"
                      background="green"
                      type="button"
                      onClick={() =>
                        onCheckRightAnswerButtonClick(idx, isRight)
                      }
                    >
                      {isRight ? "✓" : "●"}
                    </Button>
                    <Button
                      fontSize="18px"
                      width="auto"
                      height="50%"
                      background="red"
                      type="button"
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
            type="button"
            onClick={onAddAnswerButtonClick}
          >
            +
          </Button>
          <div className="operation-panel"></div>
        </>
      )}
    </div>
  );
};

export const EditIsEnable = styled(EditIsEnableContainer)`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0.5rem 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  gap: 1rem;
  background: #f0f0f0;
  position: relative;

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

  & .edit-icon {
    position: absolute;
    top: 23px;
    right: 40px;
    font-size: 23px;
  }
`;
