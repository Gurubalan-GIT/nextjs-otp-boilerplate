import { LoadingOutlined } from "@ant-design/icons";
import { variants } from "@variants";
import { Button, Typography } from "antd";
import classNames from "classnames";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Fragment } from "react";
import classes from "./CustomButton.module.scss";

const CustomIcon = dynamic(() => import("../CustomIcon"), {
  ssr: false,
});

const { Text } = Typography;

const CustomButton = (props) => {
  const {
    iconButton,
    variant,
    title,
    loading,
    icon,
    customClass,
    customTextClass,
    customIconClass,
    size,
    antdIcon,
    iconPosition,
    ...rest
  } = props;

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return iconButton ? classes.iconBtnSmall : classes.btnSmall;
      case "large":
        return iconButton ? classes.iconBtnLarge : classes.btnLarge;
      default:
        return iconButton ? classes.iconBtnDefault : classes.btnDefault;
    }
  };

  const getClassName = () => {
    switch (variant) {
      case variants.ctaButton:
        return classes.ctaBtn;
      case variants.primaryButton:
        return classes.primaryBtn;
      case variants.secondaryButton:
        return classes.secondaryBtn;
      case variants.outlineDarkButton:
        return classes.outlineDarkBtn;
      case variants.outlineLiteButton:
        return classes.outlineLiteBtn;
      case variants.ghostButton:
        return classes.ghostBtn;
      default:
        break;
    }
  };

  const getButtonText = () => {
    switch (iconPosition) {
      case "right":
        return (
          <Text className={classNames(classes.btnText, customTextClass)}>
            {title}
            {loading && !antdIcon && btnIcons.loading}
            {!loading && icon && !antdIcon && btnIcons.icon}
          </Text>
        );
      default:
        return (
          <Text className={classNames(classes.btnText, customTextClass)}>
            {loading && !antdIcon && btnIcons.loading}
            {!loading && icon && !antdIcon && btnIcons.icon}
            {title}
          </Text>
        );
    }
  };

  const btnIcons = {
    loading: (
      <LoadingOutlined
        className={classNames(
          classes.btnIcon,
          iconPosition === "right" && classes.spaceLeft
        )}
      />
    ),
    icon: (
      <CustomIcon
        icon={icon}
        customClass={classNames(
          classes.btnIcon,
          iconPosition === "right" && classes.spaceLeft,
          customIconClass
        )}
      />
    ),
  };

  return (
    <Button
      {...rest}
      icon={antdIcon}
      className={classNames(getButtonSize(), getClassName(), customClass)}
    >
      {!antdIcon && iconButton ? (
        <Fragment>
          {loading && btnIcons.loading}
          {!loading && icon && btnIcons.icon}
        </Fragment>
      ) : (
        getButtonText()
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  iconButton: PropTypes.bool,
  variant: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  customClass: PropTypes.string,
  customTextClass: PropTypes.string,
  customIconClass: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  antdIcon: PropTypes.node,
  iconPosition: PropTypes.string,
};

CustomButton.defaultProps = {
  iconButton: false,
  variant: "",
  title: "",
  loading: false,
  icon: "",
  customClass: "",
  customTextClass: "",
  customIconClass: "",
  size: "",
  onClick: () => {},
  antdIcon: null,
  iconPosition: "left",
};

export default CustomButton;
