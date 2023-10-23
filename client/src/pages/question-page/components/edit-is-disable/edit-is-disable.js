import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../../selectors";
import { Loader } from "../../../../components";
import styled from "styled-components";

const EditIsDisableContainer = ({ className, onEditButtonClick, title }) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={className} onClick={onEditButtonClick}>
      {isLoading ? <Loader /> : <h3>{title}</h3>}
    </div>
  );
};

export const EditIsDisable = styled(EditIsDisableContainer)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
