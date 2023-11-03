import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { Button, Input, SimpleLoader } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setIsLoading, setUser } from "../../actions";
import { selectIsLoading } from "../../selectors";
import { request } from "../../utils";

const fieldsSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яёА-ЯЁ\s-]+$/u,
      "Имя не может содержать иные символы, кроме букв"
    ),
  surname: yup
    .string()
    .matches(
      /^[a-zA-Zа-яёА-ЯЁ\s-]+$/u,
      "Фамилия не может содержать иные символы, кроме букв"
    ),
  password: yup
    .string()
    .required("Пароль должен быть заполнен")
    .matches(
      /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/,
      "Пароль должен состоять из заглавных букв, строчных букв и цифр"
    )
    .min(6, "Длина пароля должна быть не менее 6 символов")
    .max(20, "Длина пароля должна быть не более 20 символов"),
  passwordCheck: yup
    .string()
    .required("Необходимо повторить пароль")
    .oneOf([yup.ref("password"), null], "Введенные пароли не совпадают."),
});

const RegistrationContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", surname: "", password: "", checkPassword: "" },
    resolver: yupResolver(fieldsSchema),
  });

  const [serverError, setServerError] = useState(null);

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passwordCheck?.message;
  const error = formError || serverError;

  const sendFormData = async (userData) => {
    setServerError(null);
    dispatch(setIsLoading(true));
    await request("/register", "POST", { userData }).then(({ error, user }) => {
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
      <>
        <h2>Регистрация</h2>

        <form className="reg-form" onSubmit={handleSubmit(sendFormData)}>
          <Input
            placeholder="Имя"
            name="name"
            type="text"
            {...register("name")}
          />
          <Input
            placeholder="Фамилия"
            name="surname"
            type="text"
            {...register("surname")}
          />
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
          <Input
            placeholder="Подтверждение пароля"
            name="passwordCheck"
            type="password"
            {...register("passwordCheck")}
          />
          {error && <div className="error">{error}</div>}
          {isLoading ? (
            <SimpleLoader />
          ) : (
            <Button
              width="auto"
              height="3rem"
              fontSize="1rem"
              type="submit"
              disabled={!!formError || isLoading}
            >
              Зарегистрироваться
            </Button>
          )}
        </form>
      </>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #e5e5e5;
  border-radius: 1rem;
  margin: 0 8rem;
  padding: 0 2rem 2rem 2rem;
  box-shadow: -webkit-box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 9px 0px rgba(34, 60, 80, 0.2);
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0 2rem;
  }

  & .error {
    max-width: 100%;
    color: red;

    padding: 0.5rem 0.25rem;
    margin-bottom: 0.5rem;
  }
`;
