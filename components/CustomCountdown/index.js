import { Col } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import classes from "./CustomCountdown.module.scss";

const CustomCountdown = (props) => {
  const { value, format, onFinish, customClass } = props;

  return (
    <Col className={classNames(classes.countdownContainer, customClass)}>
      <Countdown
        value={moment().add(value + 1, "seconds")}
        onFinish={onFinish}
        format={format}
      />
    </Col>
  );
};

CustomCountdown.propTypes = {
  value: PropTypes.number,
  format: PropTypes.string,
  onFinish: PropTypes.func,
  customClass: PropTypes.string,
};

CustomCountdown.defaultProps = {
  value: 0,
  format: "mm:ss",
  onFinish: () => {},
  customClass: "",
};

export default CustomCountdown;
