import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, SimpleLoader } from "../../components";
import { setIsLoading, setUser } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoading } from "../../selectors";
import styled from "styled-components";
import { request } from "../../utils";

const LoginContainer = ({ className }) => {
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formError = errors?.login?.message || errors?.password?.message;
  const error = formError || serverError;

  const sendFormData = async (userData) => {
    setServerError(null);
    dispatch(setIsLoading(true));
    await request("/login", "POST", userData).then(({ error, user }) => {
      if (error) {
        dispatch(setIsLoading(false));
        setServerError(error);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem("user", JSON.stringify(user));
      dispatch(setIsLoading(false));
      reset();
      navigate("/");
    });
  };

  return (
    <div className={className}>
      <h2>Вход</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit(sendFormData)}>
        <Input
          placeholder="Email"
          name="email"
          type="text"
          {...register("email")}
        />
        <Input
          placeholder="Пароль"
          name="password"
          type="password"
          {...register("password")}
        />
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <Button
            width="8rem"
            height="3rem"
            fontSize="1rem"
            type="submit"
            disabled={!!formError}
          >
            Войти!
          </Button>
        )}
      </form>
      <p>
        Нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export const Login = styled(LoginContainer)`
  display: flex;
  flex-direction: column;
  align-items:center;
  margin: 0 8rem;
  border: 2px solid #e5e5e5;
  border-radius: 1rem;
  padding: 0 2rem 2rem 2rem;
  box-shadow: -webkit-box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);


  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;
