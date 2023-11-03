import { Link, useNavigate } from "react-router-dom";
import { request } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../selectors";
import { logout } from "../../actions";
import { Button } from "../button/button";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const onLogout = () => {
    request("/logout", "POST")
      .then(() => dispatch(logout()))
      .then(() => navigate("/login"));
    sessionStorage.removeItem("user");
  };

  const onLoginButtonClick = () => navigate("/login");

  return (
    <header className={className}>
      <Link to="/">Главная</Link>

      {!user ? (
        <>
          <Button
            width="5rem"
            height="2rem"
            fontSize="16px"
            onClick={onLoginButtonClick}
          >
            Вход
          </Button>
        </>
      ) : (
        <div className="user-block">
          <Link to="/my-quizzes">Мои тесты</Link>
          <Link to="/my-cabinet">
            {user.name} {user.surname}
          </Link>
          <Button width="5rem" height="2rem" fontSize="16px" onClick={onLogout}>
            Выход
          </Button>
          {/* <Link to="/" onClick={onLogout}>
            Выход
          </Link> */}
        </div>
      )}
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  border-radius: 0.5rem;
  background: #e5e5e5;
  min-height: 5rem;
  margin: 0 6rem;
  padding: 0.5rem 1rem;
  -webkit-box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.2);

  & .user-block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
  }
  & h4 {
    margin: 0;
  }
  & a {
    text-decoration: none;
  }

  & a:hover {
    color: #48467b;
  }
`;
