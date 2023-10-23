import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendQuizResultAsync, setIsLoading, setQuestions } from "../../actions";
import { selectIsLoading, selectQuestions } from "../../selectors";
import { Button, Loader } from "../../components";
import { Result } from "./components";
import { getDate } from "./utils";
import styled from "styled-components";

const TestPageContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const questions = useSelector(selectQuestions);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [testProgress, setTestProgress] = useState({ answers: [] });
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const results = JSON.parse(localStorage.getItem("results")) || [];

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetch("http://localhost:3005/questions")
      .then((res) => res.json())
      .then((loadedQuestions) => {
        dispatch(setQuestions(loadedQuestions));
        setTestProgress({
          ...testProgress,
          date: getDate(),
          quizLength: loadedQuestions.length,
        });
      })

      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  const questionsLength = questions.length;

  const getQuestion = () => {
    const nextQuestion = questions[questionNumber - 1];
    return nextQuestion;
  };
  const filtered = testProgress.answers.filter(
    (item) => item.id !== questionNumber - 1
  );

  const onPrevQuestionButtonClick = () => {
    setTestProgress({
      ...testProgress,
      answers: [...filtered],
    });
    setQuestionNumber(questionNumber - 1);
  };

  const question = getQuestion();
  const rightAnswer = question?.answers.find((answer) => answer?.isRight);

  const onAnswerClick = ({ target }) => {
    target.classList.toggle("answer-selected");
    setUserAnswer(target.innerText);
  };

  const rightAnswerCheck = () => {
    if (userAnswer === rightAnswer?.description) {
      setTestProgress({
        ...testProgress,
        answers: [
          ...testProgress.answers,
          { id: questionNumber, isRight: true },
        ],
      });
    } else {
      setTestProgress({
        ...testProgress,
        answers: [
          ...testProgress.answers,
          { id: questionNumber, isRight: false },
        ],
      });
    }
  };

  const onGetNextQuestionButtonClick = () => {
    setShowRightAnswer(true);

    setTimeout(() => {
      setQuestionNumber(questionNumber + 1);
      setShowRightAnswer(false);
    }, 0);

    if (questionNumber <= questionsLength) {
      rightAnswerCheck();
    }
  };

  const onQuizReset = () => {
    dispatch(sendQuizResultAsync(testProgress));

    results.push({
      ...testProgress,
      date: getDate(),
      quizLength: questionsLength,
    });
    localStorage.setItem(`results`, JSON.stringify(results));
    setQuestionNumber(1);
    setUserAnswer("");
    setTestProgress({ answers: [] });
  };

  return (
    <div className={className}>
      {isLoading ? (
        <Loader />
      ) : questionNumber <= questionsLength ? (
        <>
          <h3>
            Вопрос {questionNumber}/{questions.length}
          </h3>

          <h2 key={question._id}>{question.title}</h2>
          {question.answers.map((answer) => (
            <Button
              disabled={!!isAnswerChecked}
              width="100%"
              key={String(answer.id)}
              className={
                answer.description === rightAnswer?.description &&
                showRightAnswer
                  ? "answer answer-correct"
                  : answer.description !== rightAnswer?.description &&
                    showRightAnswer
                  ? "answer answer-incorrect"
                  : "answer"
              }
              onClick={onAnswerClick}
            >
              {answer.description}
            </Button>
          ))}
          <div className="navigation-panel">
            <Button
              fontSize="18px"
              disabled={questionNumber === 1}
              onClick={onPrevQuestionButtonClick}
            >
              Предыдущий вопрос
            </Button>
            <Button fontSize="18px" onClick={onGetNextQuestionButtonClick}>
              {questionNumber < questionsLength
                ? "Следующий вопрос"
                : "Завершить тест"}
            </Button>
          </div>
        </>
      ) : (
        <Result
          testProgress={testProgress}
          onQuizReset={onQuizReset}
          questionsLength={questionsLength}
        />
      )}
    </div>
  );
};

export const TestPage = styled(TestPageContainer)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & .info-block {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  & .navigation-panel {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
    gap: 0.5rem;
  }
  & .answer {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #e5e5e5;
    border-radius: 0.5rem;
    min-height: 3rem;
  }

  & .answer-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #e5e5e5;
    border-radius: 0.5rem;
    min-height: 3rem;
    transform: scale(105%);
  }

  & .answer-correct {
    background: #79f479;
  }
  & .answer-incorrect {
    background: #e24949;
    color: white;
  }
`;
