import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { History } from "../main/components";

const QuizPageContainer = ({ className, quiz }) => {
  const { id, title, author, createdAt, results } = quiz;
  const navigate = useNavigate();
  const onStartButtonClick = () => navigate(`/test/${id}`);

  return (
    <div className={className}>
      <div className="quiz-info">
        <h2>{title}</h2>
        <div className="author-info">
          Автор:
          <h4>
            {author.name} {author.surname}
          </h4>
        </div>
        <div className="date-info">
          Дата создания: <h4>{createdAt}</h4>
        </div>
        <Button
          width="10rem"
          height="3rem"
          fontSize="16px"
          onClick={onStartButtonClick}
        >
          Запустить тест
        </Button>
      </div>
      <History results={results} />
    </div>
  );
};

export const QuizPage = styled(QuizPageContainer)`
  display: flex;
  border: 2px solid #e5e5e5;
  padding: 1rem;
  width: 100%;
  flex-wrap: wrap;

  & .quiz-info {
    max-width: 50%;
    overflow: auto;
    display: flex;
    gap: 2rem;
    padding: 0 1rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-right: 1px solid #e5e5e5;
  }

  & .author-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  & h2,
  h4 {
    margin: 0;
  }

  & .date-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
