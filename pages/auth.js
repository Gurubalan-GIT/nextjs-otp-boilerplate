import AddUserDetails from "@components/Authentication/AddUserDetails";
import Login from "@components/Authentication/Login";
import VerifyOTP from "@components/Authentication/VerifyOTP";
import { secureAuthEndpoint } from "@helpers/ssr";
import RootLayout from "@layouts/RootLayout";
import {
  ADD_USER_DETAILS,
  AUTH_TOKEN,
  LOGIN,
  ROOT_ROUTE,
  VERIFY_OTP,
} from "@localization";
import { homeRedirect } from "@redirects";
import classes from "@styles/auth.module.scss";
import { variants } from "@variants";
import { Col, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Auth = ({ nextProps }) => {
  const [authState, setAuthState] = useState(nextProps.authState);
  const [form] = useForm();

  const onAuthStateChange = (state) => {
    setAuthState(state);
  };

  const getAuthState = () => {
    let authProps = {
      form,
      onAuthStateChange,
      nextProps,
    };
    switch (authState) {
      case LOGIN:
        return <Login {...authProps} />;
      case VERIFY_OTP:
        return <VerifyOTP {...authProps} />;
      case ADD_USER_DETAILS:
        return <AddUserDetails {...authProps} />;
    }
  };

  return (
    <RootLayout
      nextProps={nextProps}
      origin={ROOT_ROUTE}
      navbarVariant={variants.authNavbar}
    >
      <Col className={classes.authPage}>
        <Row justify="center">
          <Col className={classes.authCard}>{getAuthState()}</Col>
        </Row>
      </Col>
    </RootLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  if (req?.cookies[AUTH_TOKEN]) {
    return secureAuthEndpoint({ redirect: homeRedirect, ctx });
  }
  return {
    props: {},
  };
}

Auth.propTypes = {
  nextProps: PropTypes.object,
};

Auth.defaultProps = {
  nextProps: { authState: LOGIN },
};

export default Auth;
