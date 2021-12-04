import React, { Fragment } from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";
import classes from "./CustomToastMessage.module.scss";

const { Title, Paragraph } = Typography;

const CustomToastContent = (props) => {
  const { title, description } = props;

  return (
    <Fragment>
      <Title className={classes.toastTitle}>{title}</Title>
      {description && (
        <Paragraph className={classes.toastDescription}>
          {description}
        </Paragraph>
      )}
    </Fragment>
  );
};

CustomToastContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

CustomToastContent.defaultProps = {
  title: "",
  description: "",
};

export default CustomToastContent;
