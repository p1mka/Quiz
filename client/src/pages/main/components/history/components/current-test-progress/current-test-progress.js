import styled from "styled-components";

const CurrentTestProgressContainer = ({ className, result }) => {
  const { date, answers, quizLength, user } = result;
  const rightAnswersAmount = answers.filter((answer) => answer.isRight);
  return (
    <div className={className}>
      <div className="user">
        {user.name} {user.surname}
      </div>
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
    </div>
  );
};

export const CurrentTestProgress = styled(CurrentTestProgressContainer)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  font-size: 14px;

  & .user {
    display: flex;
    width: 30%;
  }

  & ul {
    padding: 0;
  }
  & li {
    display: flex;
    gap: 1rem;
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
    width: 5rem;
  }
`;
