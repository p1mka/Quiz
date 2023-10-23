import styled from "styled-components";

const CurrentTestProgressContainer = ({ className, result }) => {
  const { _id, date, answers, quizLength } = result;
  const rightAnswersAmount = answers.filter((answer) => answer.isRight);
  return (
    <div className={className}>
      <ul>
        <li>
          {date}
          <div className="progress">
            {answers.map(({ id, isRight }) => (
              <div
                key={id}
                className={isRight ? "right-answer" : "incorrect-answer"}
              />
            ))}
          </div>
          <div>
            Верно: {rightAnswersAmount.length} из {quizLength}
          </div>
        </li>
      </ul>
    </div>
  );
};

export const CurrentTestProgress = styled(CurrentTestProgressContainer)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem 0;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  & li {
    display: flex;

    gap: 1.5rem;
    flex-direction: row;
    list-style: none;
  }

  & .right-answer {
    border: 1px solid #fff;
    width: 20%;
    background: green;
  }
  & .incorrect-answer {
    border: 1px solid #fff;
    width: 20%;
    background: red;
  }
  & .progress {
    display: flex;
    border: 2px solid #e5e5e5;
    width: 15rem;
  }
`;
