import { request } from "../utils";
import { setIsLoading } from "./set-is-loading";
import { setUser } from "./set-user";

export const saveUserAsync = (id, name, surname, email) => (dispatch) => {
  dispatch(setIsLoading(true));
  request(`/users/${id}`, "PATCH", { name, surname, email })
    .then(({ error, userData }) => {
      dispatch(setUser(userData));
    })
    .finally(() => dispatch(setIsLoading(false)));
};
