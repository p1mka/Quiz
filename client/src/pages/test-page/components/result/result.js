import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import styled from "styled-components";

const ResultContainer = ({
  className,
  testProgress,
  onQuizReset,
  questionsLength,
}) => {
  const navigate = useNavigate();

  const correctAnswers = testProgress.answers.filter(
    (item) => item.isRight === true
  );

  const onMainPageReturn = () => {
    onQuizReset();
    navigate("/");
  };

  return (
    <div className={className}>
      <h2>
        Результат теста: {correctAnswers.length}/{questionsLength}
      </h2>

      <div className="test-resume">
        <div className="test-progress">
          <h3>Прогресс прохождения:</h3>
          {testProgress.answers.map((answer) => (
            <div key={answer.id}>
              Вопрос {answer.id} :
              {answer.isRight ? " Верный ответ" : " Неверный ответ"}
            </div>
          ))}
        </div>
      </div>
      <div className="info-block">
        <Button fontSize="18px" onClick={onQuizReset}>
          Начать заново
        </Button>
        <Button fontSize="18px" onClick={onMainPageReturn}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export const Result = styled(ResultContainer)`
  & .test-resume {
    display: flex;
    flex-direction: column;
    border: 2px solid #e5e5e5;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
  }

  & .test-progress {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;
