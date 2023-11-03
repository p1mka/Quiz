import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Input, SimpleLoader } from "../../components";
import { saveUserAsync } from "../../actions";
import styled from "styled-components";
import { selectIsLoading } from "../../selectors";

const MyCabinetContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const currentUserJSON = sessionStorage.getItem("user");

  const user = JSON.parse(currentUserJSON);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const nameWithSurname = [user.name, user.surname].join(" ");
  const [userName, setUserName] = useState(nameWithSurname);

  const onUserEditButtonClick = () => {
    setIsUserEditing(true);
  };
  const onNameChange = ({ target }) => {
    setUserName(target.value);
  };
  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };
  const onUserDataSave = async () => {
    const [name, surname] = userName.split(" ");
    if (
      user.name !== name ||
      user.surname !== surname ||
      user.email !== email
    ) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: name,
          surname: surname,
          email: email,
        })
      );
      dispatch(saveUserAsync(user.id, name, surname, email));
    }

    setIsUserEditing(false);
  };
  return (
    <div className={className}>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <>
          <i
            className="user-edit-button"
            onClick={isUserEditing ? onUserDataSave : onUserEditButtonClick}
          >
            {isUserEditing ? "✓" : "✐"}
          </i>
          <div className="user-image"></div>
          {isUserEditing ? (
            <>
              <Input
                className="user-name"
                value={userName}
                onChange={onNameChange}
                required={true}
              />
              <Input
                className="user-name"
                defaultValue={email}
                onChange={onEmailChange}
                required={true}
              />
            </>
          ) : (
            <>
              <div className="user-name">{userName}</div>
              {email}
            </>
          )}
        </>
      )}
    </div>
  );
};

export const MyCabinet = styled(MyCabinetContainer)`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  //   min-width: 20rem;
  border-radius: 0.5rem;
  padding: 20px;
  position: relative;
  -webkit-box-shadow: 0px 1px 8px 5px rgba(229, 229, 229, 0.75);
  -moz-box-shadow: 0px 1px 8px 5px rgba(229, 229, 229, 0.75);
  box-shadow: 0px 1px 8px 5px rgba(229, 229, 229, 0.75);

  & .user-image {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 1px solid black;
  }
  & .user-name {
    font-size: 20px;
    font-weight: bold;
  }
  & i {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-size: 36px;
    cursor: pointer;
  }
  & i:hover {
    color: #48467b;
  }
`;
