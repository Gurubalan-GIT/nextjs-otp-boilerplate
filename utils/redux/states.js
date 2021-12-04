import { isMobile, isTab } from "@helpers/global";

export const initialUserState = {
  isUserLoggedIn: false,
  userDetails: null,
};

export const initialHelperState = {
  isMobile: isMobile(),
  isTab: isTab(),
};

export const combinedInitialState = {
  user: initialUserState,
  helper: initialHelperState,
};

export const ignoreStatesFromPersist = ["helper"];
