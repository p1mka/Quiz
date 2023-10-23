import { History } from "./components";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainContainer = ({ className }) => {
  const navigate = useNavigate();

  const onStartButtonClick = () => navigate("/test");
  const onTestEdit = () => navigate("/edit");

  return (
    <div className={className}>
      <div className="navigation">
        <Button onClick={onStartButtonClick}>Запустить тест</Button>
        <Button onClick={onTestEdit}>Редактировать тест</Button>
      </div>
      <History />
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  & .navigation {
    display: flex;
    align-items: center;
    margin: 1rem auto;
    gap: 1rem;
  }
`;
