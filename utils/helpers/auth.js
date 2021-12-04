import {
  FIRST_LOGIN,
  REDUX_PERSIST,
  REMOVE_COOKIE_ENDPOINT,
  ROOT_ROUTE,
  SET_COOKIE_ENDPOINT,
} from "@localization";
import { logger } from "./logger";
import { decrypt, encrypt } from "./security";
import fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
let token = null;

export const setSeverSideCookie = (token, callback = () => {}) => {
  fetch(SET_COOKIE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      key: process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY,
    }),
  })
    .then(callback)
    .catch((err) => logger.print(err));
};

export const removeServerSideCookie = (callback = () => {}) => {
  fetch(REMOVE_COOKIE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY,
    }),
  })
    .then(callback)
    .catch((err) => logger.print(err));
};

export const getFirstTimeLoginStatus = () => {
  return Cookies.get(FIRST_LOGIN) ?? null;
};

export const setFirstTimeLoginStatus = () => {
  Cookies.set(FIRST_LOGIN, FIRST_LOGIN, { expires: 30, path: "/" });
};

export const removeFirstTimeLoginStatus = () => {
  Cookies.remove(FIRST_LOGIN, { path: "/" });
};
