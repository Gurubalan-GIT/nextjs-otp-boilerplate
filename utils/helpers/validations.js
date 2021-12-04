import FormErrorMessage from "@components/FormErrorMessage";

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const numericRegex = /\D/;

export const validationMessages = {
  required: "This field is required",
  types: {
    email: "Please enter a valid email address",
    otp: "Please enter a valid OTP",
    phone: "Please enter a valid phone number",
  },
};

export const emailValidator = async (_, value) => {
  if (value == "") {
    return Promise.reject(<FormErrorMessage />);
  }
  if (!emailRegex.test(value)) {
    return Promise.reject(<FormErrorMessage type="email" />);
  }
};

export const otpValidator = async (_, value) => {
  if (value == "") {
    return Promise.reject(<FormErrorMessage type="otp" />);
  }
  if (numericRegex.test(value)) {
    return Promise.reject(<FormErrorMessage type="otp" />);
  }
};

export const phoneNumberValidator = async (_, value) => {
  if (value == "") {
    return Promise.reject(<FormErrorMessage type="phone" />);
  }
  if (numericRegex.test(value)) {
    return Promise.reject(<FormErrorMessage type="phone" />);
  }
  if (value.length > 10 || value.length < 7) {
    return Promise.reject(<FormErrorMessage type="phone" />);
  }
};
