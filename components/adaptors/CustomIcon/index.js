import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const CustomIcon = (props) => {
  const { icon, customClass, ...rest } = props;
  return (
    <i aria-hidden className={classNames(icon, customClass)} {...rest}></i>
  );
};

CustomIcon.propTypes = {
  icon: PropTypes.string,
  customClass: PropTypes.string,
};

CustomIcon.defaultProps = {
  icon: "",
  customClass: "",
};

export default CustomIcon;
