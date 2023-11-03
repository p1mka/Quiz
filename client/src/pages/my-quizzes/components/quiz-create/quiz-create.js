import { Button, Input } from "../../../../components";
import { useState } from "react";
import { EditIsEnable } from "../../../question-page/components";
import { useDispatch } from "react-redux";
import { addQuizAsync } from "../../../../actions";
import styled from "styled-components";

const QuizCreateContainer = ({ className, setIsCreating }) => {
  const dispatch = useDispatch();

  const [newQuizData, setNewQuizData] = useState({
    title: "",
    questions: [
      {
        questionId: Date.now(),
        questionTitle: "",
        answers: [
          {
            id: Date.now(),
            description: "",
            isRight: false,
          },
        ],
        isNowCreated: true,
      },
    ],
  });

  const [errors, setErrors] = useState(null);

  const onClose = () => setIsCreating(false);

  const onAddQuestionButtonClick = () =>
    setNewQuizData({
      ...newQuizData,
      questions: [
        ...newQuizData.questions,
        {
          questionId: Date.now(),
          questionTitle: "",
          answers: [
            {
              id: Date.now(),
              description: "",
              isRight: false,
            },
          ],
          isNowCreated: true,
        },
      ],
    });

  const onQuizTitleChange = ({ target }) =>
    setNewQuizData({ ...newQuizData, title: target.value });

  const onnewQuizDataSend = (e) => {
    e.preventDefault();
    let quizHasRightAnswers = true;
    newQuizData.questions.forEach((question) => {
      delete question.isNowCreated;

      if (!question.answers.some((answer) => answer.isRight === true)) {
        quizHasRightAnswers = false;
        setErrors(
          `В вопросе ${question.questionTitle} не выбран верный ответ!`
        );
      }
    });
    if (quizHasRightAnswers) {
      dispatch(addQuizAsync(newQuizData));
      setIsCreating(false);
    }
  };

  return (
    <div className={className}>
      <h2>Создание теста</h2>
      <i onClick={onClose}>&times;</i>
      <form onSubmit={onnewQuizDataSend}>
        <Input
          width="90%"
          placeholder="Название теста"
          value={newQuizData.title}
          onChange={onQuizTitleChange}
          required={true}
        />
        {newQuizData.questions.map((question, id) => (
          <EditIsEnable
            key={id}
            questionNumber={id}
            question={question}
            newQuizData={newQuizData}
            setNewQuizData={setNewQuizData}
            setErrors={setErrors}
          />
        ))}

        {errors && <div className="error-message">{errors}</div>}
        <div className="submit-buttons">
          <Button
            width="10rem"
            height="2rem"
            fontSize="16px"
            onClick={onAddQuestionButtonClick}
            type="submit"
          >
            Добавить вопрос
          </Button>
          <Button
            width="10rem"
            height="2rem"
            fontSize="16px"
            type="submit"
            disabled={!newQuizData.title}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export const QuizCreate = styled(QuizCreateContainer)`
  display: flex;
  flex-direction: column;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  margin: 0 2rem;
  padding: 2rem 0;
  // min-height: 30rem;
  position: relative;

  & i {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 30px;
    cursor: pointer;
  }
  & .submit-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }

  & .error-message {
    color: red;
    font-weight: bold;
  }
`;
