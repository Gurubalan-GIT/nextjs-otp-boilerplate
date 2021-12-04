import { ERROR_SVG_PATH } from "@localization";
import React from "react";

const ErrorPage = (props) => {
  return (
    <ErrorPage
      pageTitle="500 - INTERNAL SERVER ERROR"
      imgUrl={ERROR_SVG_PATH}
      errorHeading="Uh oh, our server failed."
      errorContent="Sorry about that, we’re working on fixing the problem. Please try refreshing the page or try again later."
    />
  );
};

export default ErrorPage;
