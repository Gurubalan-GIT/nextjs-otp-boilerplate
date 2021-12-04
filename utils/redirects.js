import {
  ACCESS_DENIED_ROUTE,
  HOME_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  ROOT_ROUTE,
  SERVER_ERROR_ROUTE,
} from "@localization";

export const rootRedirect = {
  destination: ROOT_ROUTE,
  permanent: false,
};

export const homeRedirect = {
  destination: HOME_ROUTE,
  permanent: false,
};

export const pageNotFoundRedirect = {
  destination: PAGE_NOT_FOUND_ROUTE,
  permanent: false,
};

export const accessDeniedRedirect = {
  destination: ACCESS_DENIED_ROUTE,
  permanent: false,
};

export const serverErrorRedirect = {
  destination: SERVER_ERROR_ROUTE,
  permanent: false,
};
