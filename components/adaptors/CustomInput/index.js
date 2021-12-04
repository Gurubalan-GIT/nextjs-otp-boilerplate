import InlineMessage from "@components/InlineMessage";
import { fas } from "@icons";
import { variants } from "@variants";
import { Input, Row, Typography } from "antd";
import classNames from "classnames";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import classes from "./CustomInput.module.scss";

const CustomIcon = dynamic(() => import("@components/adaptors/CustomIcon"), {
  ssr: false,
});

const { TextArea } = Input;
const { Text } = Typography;

const CustomInput = (props) => {
  const {
    variant,
    formItem,
    textArea,
    label,
    disabledLabel,
    optionalText,
    errorMessage,
    error,
    onChange,
    handleChange,
    extraLabelRight,
    ...rest
  } = props;

  return (
    <Row className={classes.customInputWrapper}>
      {label && (
        <label
          className={classNames(
            classes.inputLabel,
            disabledLabel && classes.inputDisabledLabel
          )}
        >
          {label}
          {optionalText && (
            <Text className={classes.optionalLabel}>({optionalText})</Text>
          )}
        </label>
      )}
      {extraLabelRight && (
        <Row className={classes.extraLabelRight}>{extraLabelRight}</Row>
      )}
      {textArea ? (
        <TextArea
          {...rest}
          className={classNames(classes.customInputBox)}
          autoSize={{ minRows: 4, maxRows: 5 }}
          onChange={formItem ? onChange : handleChange}
        />
      ) : (
        <Input
          {...rest}
          type={variant}
          className={classNames(classes.customInputBox)}
          onChange={formItem ? onChange : handleChange}
        />
      )}
      {error && (
        <InlineMessage
          variant={variants.errorInlineMessage}
          message={errorMessage}
          icon={<CustomIcon icon={fas.faInfoCircle} />}
        />
      )}
    </Row>
  );
};

CustomInput.propTypes = {
  variant: PropTypes.string,
  formItem: PropTypes.bool,
  label: PropTypes.string,
  optionalText: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  handleChange: PropTypes.func,
  extraLabelRight: PropTypes.node,
  disabledLabel: PropTypes.bool,
};

CustomInput.defaultProps = {
  variant: "",
  formItem: false,
  label: "",
  optionalText: "",
  error: false,
  errorMessage: "",
  onChange: () => {},
  handleChange: () => {},
  extraLabelRight: null,
  disabledLabel: false,
};

export default CustomInput;
