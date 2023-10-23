import { useState } from "react";
import { CurrentTestProgress } from "./components";
import { Button } from "../../../../components";
import styled from "styled-components";

const HistoryContainer = ({ className }) => {
  const [isDateSortEnable, setIsDateSortEnable] = useState(false);
  const [isRightAnswersSortEnable, setIsRightAnswersSortEnable] =
    useState(false);
  const results = JSON.parse(localStorage.getItem("results"));

  const sortedByDateResults = isDateSortEnable
    ? results.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      })
    : results;

  const sortedByRightAnswersResults = isRightAnswersSortEnable
    ? results.sort((a, b) => {
        if (a.correctAnswersCount > b.correctAnswersCount) {
          return -1;
        }
        if (a.correctAnswersCount < b.correctAnswersCount) {
          return 1;
        }
        return 0;
      })
    : results;

  const sortedResults = isRightAnswersSortEnable
    ? sortedByRightAnswersResults
    : isDateSortEnable
    ? sortedByDateResults
    : results;

  const onDateSortButtonClick = () => setIsDateSortEnable(!isDateSortEnable);
  const onRightAnswersSortButtonClick = () =>
    setIsRightAnswersSortEnable(!isRightAnswersSortEnable);

  return (
    <div className={className}>
      <h2>История прохождений</h2>
      {results ? (
        <>
          <div className="sort-buttons">
            <Button
              height="1.5rem"
              fontSize="12px"
              onClick={onDateSortButtonClick}
            >
              Сортировать по дате
            </Button>
            <Button
              height="1.5rem"
              fontSize="12px"
              onClick={onRightAnswersSortButtonClick}
            >
              {isRightAnswersSortEnable
                ? "Сортировать по количеству неверных ответов"
                : "Сортировать по количеству верных ответов"}
            </Button>
          </div>

          {sortedResults.map((result, id) => (
            <CurrentTestProgress key={id} result={result} />
          ))}
        </>
      ) : (
        <h3>Вы пока не завершили ни одного теста...</h3>
      )}
    </div>
  );
};

export const History = styled(HistoryContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  & .sort-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;
