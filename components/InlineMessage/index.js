import { variants } from "@variants";
import { Row, Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import classes from "./InlineMessage.module.scss";

const { Text } = Typography;

const InlineMessage = (props) => {
  const { variant, message, icon } = props;

  const getClassName = () => {
    switch (variant) {
      case variants.errorInlineMessage:
        return classes.error;
      case variants.infoInlineMessage:
        return classes.info;
      case variants.warningInlineMessage:
        return classes.warning;
      default:
        break;
    }
  };

  return (
    <Row className={classNames(classes.inlineMessage, getClassName())}>
      <span className={classes.inlineMessageIcon}>{icon}</span>
      <Text className={classes.inlineMessageText}>{message}</Text>
    </Row>
  );
};

InlineMessage.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.element,
};

InlineMessage.defaultProps = {
  variant: "",
  message: "",
  icon: null,
};

export default InlineMessage;
