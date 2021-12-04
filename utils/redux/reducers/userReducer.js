import { ACTION_TYPES } from "@redux/actions/types";
import { initialUserState } from "@redux/states";
const { LOGIN_USER, LOGOUT_USER, RESET_USER_STATE, UPDATE_USER } = ACTION_TYPES;

let initialState = initialUserState;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isUserLoggedIn: true,
        userDetails: { ...state.userDetails, ...action.payload },
      };
    case UPDATE_USER:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload },
      };
    case LOGOUT_USER:
      return {
        ...state,
        isUserLoggedIn: false,
        userDetails: null,
      };
    case RESET_USER_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
