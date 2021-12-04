import Layout, { Content } from "antd/lib/layout/layout";
import PropTypes from "prop-types";
import React from "react";
import classes from "./RootLayout.module.scss";

const RootLayout = (props) => {
  const { children } = props;

  return (
    <Layout className={classes.rootContainer}>
      <Content>{children}</Content>
    </Layout>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node,
};

RootLayout.defaultProps = {
  children: null,
};

export default RootLayout;
