import { ACTION_TYPES } from "./types";
const { LOGIN_USER, LOGOUT_USER, RESET_USER_STATE, UPDATE_USER } = ACTION_TYPES;

export const userLoginAction = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload,
    });
  };
};

export const userUpdateAction = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER,
      payload,
    });
  };
};

export const userLogoutAction = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
      payload,
    });
  };
};

export const userResetAction = (payload = {}) => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_STATE,
      payload,
    });
  };
};
