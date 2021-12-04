import CustomToastMessage from "@components/CustomToastMessage";
import { isMobile } from "@helpers/global";
import { ACTION_TYPES } from "@redux/actions/types";
import { initialHelperState } from "@redux/states";
const { SHOW_TOAST_MESSAGE } = ACTION_TYPES;

let initialState = initialHelperState;

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST_MESSAGE:
      return CustomToastMessage(action.payload);
    default:
      return state;
  }
};

export default helperReducer;
