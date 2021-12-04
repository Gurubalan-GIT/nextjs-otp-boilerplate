import { ACTION_TYPES } from "./types";
const { SHOW_TOAST_MESSAGE } = ACTION_TYPES;

export const openToastMessage = ({
  title,
  description,
  variant,
  icon,
  timeout,
}) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_TOAST_MESSAGE,
      payload: { title, description, variant, icon, timeout },
    });
  };
};
