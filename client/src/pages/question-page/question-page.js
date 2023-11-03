import { useState } from "react";
import styled from "styled-components";
import { EditIsEnable, EditIsDisable } from "./components";
import { useDispatch } from "react-redux";
// import { removeQuestionAsync } from "../../actions";

const QuestionPageContainer = ({ className }, question) => {
  const { _id, title, answers, isNowCreated } = question;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(true);

  const onEditButtonClick = () => {
    setIsEditing(!isEditing);
  };
  const onRemoveButtonClick = (_id) => {
    const message = window.confirm(`Удалить вопрос ${title} ?`);
    if (message) {
      // dispatch(removeQuestionAsync(_id));
    }
  };
  return (
    <div className={className}>
      <div className="info-block">
        {isEditing || isNowCreated ? (
          <EditIsEnable
            isNowCreated={isNowCreated}
            questionId={_id}
            title={title}
            answers={answers}
            setIsEditing={setIsEditing}
          />
        ) : (
          <EditIsDisable onEditButtonClick={onEditButtonClick} title={title} />
        )}
      </div>
      <div className="edit-buttons">
        <i className="edit-icon" onClick={onEditButtonClick}>
          {isEditing ? "▲" : "▼"}
        </i>
        {!isNowCreated && (
          <i className="remove-icon" onClick={() => onRemoveButtonClick(_id)}>
            &times;
          </i>
        )}
      </div>
    </div>
  );
};

export const QuestionPage = styled(QuestionPageContainer)`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 0.5rem;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  min-height: 60px;
  width: 100%;
  & .edit-buttons {
    width: 10%;
  }
  & .info-block {
    width: 85%;
  }
  & i {
    cursor: pointer;
  }

  & .edit-icon {
    position: absolute;
    top: 24px;
    right: 50px;
  }
  & .remove-icon {
    position: absolute;
    top: 17px;
    right: 25px;
    font-size: 24px;
  }
`;
