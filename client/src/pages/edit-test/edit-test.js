import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionPage } from "../question-page/question-page";
import { Button, Loader } from "../../components";
import { selectIsLoading, selectQuizList } from "../../selectors";
import { addQuestion, setIsLoading, setQuizList } from "../../actions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils";

const EditTestContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const quizList = useSelector(selectQuizList);

  const onAddQuestionButtonClick = () => dispatch(addQuestion());

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(true));
    request("/quizlist")
      .then((data) => {
        dispatch(setQuizList(data.quizList));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  return (
    <div className={className}>
      <h2>Редактирование теста</h2>
      <p>Нажмите на вопрос для изменения</p>
      {isLoading ? (
        <Loader />
      ) : (
        quizList.map(({ _id, quizTitle, questions }) => (
          <div key={_id}>
            {quizTitle}
            {questions.map((question) => (
              <div key={String(question._id)}>
                <QuestionPage question={question} />
              </div>
            ))}
          </div>
        ))
      )}
      <div className="navigation-panel">
        <Button fontSize="18px" onClick={onAddQuestionButtonClick}>
          Добавить вопрос
        </Button>
        <Button fontSize="18px" onClick={() => navigate("/")}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export const EditTest = styled(EditTestContainer)`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;

  & .navigation-panel {
    display: flex;
    justify-content: space-around;
  }
`;
