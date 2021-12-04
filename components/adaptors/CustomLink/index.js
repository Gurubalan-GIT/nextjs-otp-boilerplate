import { Fragment } from "react";
import Link from "next/link";
import classes from "./CustomLink.module.scss";
import classNames from "classnames";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const CustomIcon = dynamic(() => import("@components/adaptors/CustomIcon"), {
  ssr: false,
});

const CustomLink = (props) => {
  const {
    nativeLink,
    customClass,
    children,
    icon,
    customIconClass,
    size,
    color,
    hideTextDecoration,
    ...rest
  } = props;

  const getLinkSize = () => {
    switch (size) {
      case "small":
        return classes.linkSmall;
      case "tiny":
        return classes.linkTiny;
      default:
        return classes.linkMedium;
    }
  };

  const getColor = () => {
    switch (color) {
      case "yellow":
        return classes.linkYellow;
      case "blue":
        return classes.linkBlue;
      default:
        return classes.linkWhite;
    }
  };

  return (
    <Fragment>
      {nativeLink ? (
        <a
          {...rest}
          className={classNames(
            classes.customLink,
            getLinkSize(),
            getColor(),
            !hideTextDecoration && classes.showTextDecoration,
            customClass
          )}
          rel="noreferrer noopener"
        >
          {children}
          {icon && (
            <CustomIcon
              icon={icon}
              customClass={classNames(classes.defaultIcon, customIconClass)}
            />
          )}
        </a>
      ) : (
        <Link {...rest}>
          <a
            className={classNames(
              classes.customLink,
              getLinkSize(),
              getColor(),
              !hideTextDecoration && classes.showTextDecoration,
              customClass
            )}
          >
            {children}
            {icon && (
              <CustomIcon
                icon={icon}
                customClass={classNames(classes.defaultIcon, customIconClass)}
              />
            )}
          </a>
        </Link>
      )}
    </Fragment>
  );
};

CustomLink.propTypes = {
  nativeLink: PropTypes.bool,
  customClass: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string,
  customIconClass: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  hideTextDecoration: PropTypes.bool,
};

CustomLink.defaultProps = {
  nativeLink: false,
  customClass: "",
  href: "",
  children: null,
  icon: "",
  customIconClass: "",
  size: "",
  color: "white",
  hideTextDecoration: false,
};

export default CustomLink;
