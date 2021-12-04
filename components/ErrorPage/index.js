import CustomButton from "@components/adaptors/CustomButton";
import { ERROR_SVG_PATH } from "@localization";
import { variants } from "@variants";
import { Col, Typography } from "antd";
import Image from "next/image";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import classes from "./ErrorPage.module.scss";

const { Title, Paragraph } = Typography;

const ErrorPage = (props) => {
  const {
    pageTitle,
    imgUrl,
    errorHeading,
    errorContent,
    buttonText,
    onButtonClick,
  } = props;

  return (
    <Col className={classes.errorPage}>
      <Title className={classes.pageTitle}>{pageTitle}</Title>
      <Col className={classes.pageImg}>
        <Image
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
          src={imgUrl}
          alt="error"
        />
      </Col>
      <Title className={classes.errorHeading}>{errorHeading}</Title>
      <Paragraph className={classes.errorContent}>{errorContent}</Paragraph>
      {buttonText && (
        <CustomButton
          variant={variants.secondaryButton}
          title={buttonText}
          onClick={onButtonClick}
        />
      )}
    </Col>
  );
};

ErrorPage.propTypes = {
  pageTitle: PropTypes.string,
  imgUrl: PropTypes.string,
  errorHeading: PropTypes.string,
  errorContent: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

ErrorPage.defaultProps = {
  pageTitle: "500 - INTERNAL SERVER ERROR",
  imgUrl: ERROR_SVG_PATH,
  errorHeading: "Uh oh, our server failed.",
  errorContent:
    "Sorry about that, we’re working on fixing the problem. Please try refreshing the page or try again later.",
  buttonText: "",
  onButtonClick: () => {
    Router.replace("/");
  },
};

export default ErrorPage;
