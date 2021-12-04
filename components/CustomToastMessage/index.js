import CustomToastContent from "@components/CustomToastMessage/CustomToastContent";
import { custom403Content, custom500Content } from "@constants";
import { fas } from "@icons";
import { variants } from "@variants";
import { message } from "antd";
import classNames from "classnames";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import classes from "./CustomToastMessage.module.scss";

const CustomIcon = dynamic(() => import("@components/adaptors/CustomIcon"), {
  ssr: false,
});

const CustomToastMessage = (payload) => {
  let { title, description, variant, icon, timeout } = payload;

  const getClassName = () => {
    switch (variant) {
      case variants.positiveToastMessage:
        return classes.toastPositive;
      case variants.negativeToastMessage:
        return classes.toastNegative;
      case variants.warningToastMessage:
        return classes.toastWarning;
      case variants.error:
        title = custom500Content.pageTitle;
        description = custom500Content.toastMessage;
        return classes.toastNegative;
      case variants.accessDenied:
        title = custom403Content.pageTitle;
        description = custom403Content.toastMessage;
        return classes.toastNegative;
      default:
        break;
    }
  };

  const getIconName = () => {
    switch (variant) {
      case variants.positiveToastMessage:
        return fas.faCheckCircle;
      case variants.negativeToastMessage:
        return fas.faExclamationCircle;
      case variants.warningToastMessage:
        return fas.faExclamationTriangle;
      case variants.error:
        return fas.faExclamationCircle;
      default:
        break;
    }
  };

  return message.info({
    className: classNames(classes.customToastMessage, getClassName()),
    content: <CustomToastContent title={title} description={description} />,
    icon: icon ?? <CustomIcon icon={getIconName()} />,
    duration: timeout,
  });
};

CustomToastMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.element,
  timeout: PropTypes.number,
};

CustomToastMessage.defaultProps = {
  title: "",
  description: "",
  variant: "",
  icon: null,
  timeout: 2,
};

export default CustomToastMessage;
