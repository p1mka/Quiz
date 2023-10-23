import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionPage } from "../question-page/question-page";
import { Button, Loader } from "../../components";
import { selectIsLoading, selectQuestions } from "../../selectors";
import { addQuestion, setIsLoading, setQuestions } from "../../actions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EditTestContainer = ({ className }) => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);

  const onAddQuestionButtonClick = () => dispatch(addQuestion());

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetch("http://localhost:3005/questions")
      .then((res) => res.json())
      .then((loadedQuestions) => {
        dispatch(setQuestions(loadedQuestions));
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
        questions.map((question) => (
          <div key={String(question._id)}>
            <QuestionPage question={question} />
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

  & .navigation-panel {
    display: flex;
    justify-content: space-around;
  }
`;
