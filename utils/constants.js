import { ERROR_SVG_PATH, PAGE_NOT_FOUND_SVG_PATH } from "@localization";

export const cookieSerializeOptions = {
  httpOnly: true,
  path: "/",
  secure: false, // for https only, we don't have a https server yet
  sameSite: "strict",
};

export const custom404Content = {
  pageTitle: "404 - PAGE NOT FOUND",
  imgUrl: PAGE_NOT_FOUND_SVG_PATH,
  errorHeading: "You may be lost...",
  errorContent:
    "Don’t worry, it’s just that the page you are looking for does not exist or has been moved. Double check the URL, else let’s get you back home.",
  buttonText: "Take me back home",
};

export const custom500Content = {
  pageTitle: "500 - INTERNAL SERVER ERROR",
  imgUrl: ERROR_SVG_PATH,
  errorHeading: "Uh oh, our server failed.",
  errorContent:
    "Sorry about that, we’re working on fixing the problem. Please try refreshing the page or try again later.",
  toastMessage:
    "We’re working on fixing the problem. Please try refreshing the page or try again later.",
};
