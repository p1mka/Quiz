import { request } from "../utils";
import { setUser } from "./set-user";

export const getUserAsync = () => async (dispatch) => {
  await request("/users")
    .then((res) => res.json())
    .then((data) => {
      dispatch(setUser(data));
    });
};
