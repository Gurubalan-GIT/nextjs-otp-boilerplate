import { combineReducers } from "redux";
import helperReducer from "./helperReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  helper: helperReducer,
});

export default reducers;
