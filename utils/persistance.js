import { isSSR } from "@helpers/global";
import { decrypt, encrypt } from "@helpers/security";
import { REDUX_PERSIST, ROOT_ROUTE } from "@localization";
import { isEqual } from "lodash";
let token = null;

export const getCompletedCourseReviewStatus = (courseSlug) => {
  const serializedState = localStorage.getItem(courseSlug);
  if (serializedState) {
    const persistedState = JSON.parse(serializedState);
    return persistedState;
  }
  return null;
};

export const setReviewCourse = (course) => {
  localStorage.setItem(course.slug, JSON.stringify(course));
};

export const getPersistedAuthToken = () => {
  const serializedState = isSSR() ? null : localStorage.getItem(REDUX_PERSIST);
  if (serializedState) {
    const persistedState = JSON.parse(serializedState);
    if (persistedState?.user?.userDetails?.encryptedAuthToken) {
      token = decrypt(persistedState?.user?.userDetails?.encryptedAuthToken);
    }
  }
  return token;
};

export const getPersistedCurrentUser = () => {
  const serializedState = localStorage.getItem(REDUX_PERSIST);
  let user;
  if (serializedState) {
    const persistedState = JSON.parse(serializedState);
    user = persistedState?.user?.userDetails;
  }
  return user;
};

export const getPersistedLoginStatus = () => {
  const serializedState = localStorage.getItem(REDUX_PERSIST);
  let isUserLoggedIn;
  if (serializedState) {
    const persistedState = JSON.parse(serializedState);
    isUserLoggedIn = persistedState?.user?.isUserLoggedIn;
  }
  return isUserLoggedIn;
};

export const clearReduxPersist = () => {
  localStorage.removeItem(REDUX_PERSIST);
};

export const rePersistAuthenticatedPageData = (
  nextProps,
  reduxCallback,
  origin
) => {
  if (nextProps?.userDetails?.authToken && !getPersistedAuthToken()) {
    const encryptedAuthToken = encrypt(nextProps.userDetails.authToken);
    reduxCallback.userUpdateAction({
      encryptedAuthToken,
    });
  }
  if (nextProps?.userDetails) {
    const persistedUserDetails = getPersistedCurrentUser();
    if (
      !persistedUserDetails ||
      !isEqual(persistedUserDetails, nextProps.userDetails)
    ) {
      reduxCallback.userUpdateAction({
        ...nextProps.userDetails,
      });
    }
  }
  if (!getPersistedLoginStatus() && origin !== ROOT_ROUTE) {
    reduxCallback.userLoginAction();
  }
};
