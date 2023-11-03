import { setIsLoading } from "./set-is-loading";
import { setServerError } from "./set-server-error";

export const addUser = (userData) => (dispatch) => {
  dispatch(setIsLoading(true));
  fetch(`http://localhost:3005/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      userData,
    }),
  })
    .then((res) => res.json())
    .finally(() => dispatch(setIsLoading(false)));
};
