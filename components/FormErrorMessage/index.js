import InlineMessage from "@components/InlineMessage";
import { validationMessages } from "@helpers/validations";
import { fas } from "@icons";
import { variants } from "@variants";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React from "react";

const CustomIcon = dynamic(() => import("@components/adaptors/CustomIcon"), {
  ssr: false,
});

const FormErrorMessage = ({ type }) => {
  return (
    <InlineMessage
      variant={variants.errorInlineMessage}
      message={
        type
          ? validationMessages.types[type] ?? validationMessages.required
          : validationMessages.required
      }
      icon={<CustomIcon icon={fas.faInfoCircle} />}
    />
  );
};

FormErrorMessage.propTypes = {
  type: PropTypes.string,
};

FormErrorMessage.defaultProps = {
  type: "",
};

export default FormErrorMessage;
