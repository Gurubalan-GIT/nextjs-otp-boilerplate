import { useMutation } from "@apollo/client";
import CustomButton from "@components/adaptors/CustomButton";
import CustomInput from "@components/adaptors/CustomInput";
import CustomLink from "@components/adaptors/CustomLink";
import FormErrorMessage from "@components/FormErrorMessage";
import { setSeverSideCookie } from "@helpers/auth";
import { encrypt } from "@helpers/security";
import { emailValidator } from "@helpers/validations";
import { ADD_USER_DETAILS, VERIFY_OTP } from "@localization";
import { LOGIN } from "@mutations/auth";
import { userActions } from "@redux/actions";
import classes from "@styles/auth.module.scss";
import { variants } from "@variants";
import { Col, Form, Typography } from "antd";
import { gqlErrors } from "graphql/errors";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const { Title, Paragraph } = Typography;

const Login = (props) => {
  const { form, onAuthStateChange } = props;
  const { setFields } = form;
  const dispatch = useDispatch();
  const { userUpdateAction } = bindActionCreators(userActions, dispatch);
  const [login] = useMutation(LOGIN);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (email) => {
    try {
      const { data } = await login({ variables: { email } });
      if (data?.login?.accessToken) {
        // Optional - If you want to store the access token in your localStorage ( i.e after hashing / encrypting it as you see here ) or in server-side cookies
        const encryptedAuthToken = encrypt(data.login.accessToken);
        // We do both -> Because Apollo client does not support server side cookies to be set on client side. So we are setting both in localStorage ( encrypted ) and server side cookies.
        userUpdateAction({
          encryptedAuthToken,
        });
        setSeverSideCookie(data.login.accessToken, () => {
          setLoggingIn(false);
          onAuthStateChange(ADD_USER_DETAILS);
        });
      }
    } catch (error) {
      setLoggingIn(false);
      const gqlError = error.graphQLErrors[0];
      if (gqlError?.message === gqlErrors.messages.loginOTP) {
        onAuthStateChange(VERIFY_OTP);
      }
      if (gqlError?.message === gqlErrors.messages.email) {
        setFields([
          {
            name: "email",
            errors: [
              <FormErrorMessage key="email-error-message" type="email" />,
            ],
          },
        ]);
      }
    }
  };

  const onFinish = (values) => {
    setLoggingIn(true);
    let { email } = values;
    handleLogin(email);
  };

  return (
    <Col className={classes.loginWrapper}>
      <Title className={classes.authCardTitle}>OTP Template</Title>
      <Paragraph className={classes.authCardSubText}>
        Get started by accessing your dashboard
      </Paragraph>
      <Form
        form={form}
        name="basic"
        initialValues={{
          email: "",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              validator: emailValidator,
            },
          ]}
        >
          <CustomInput
            formItem
            label="Email"
            variant={variants.textInput}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item className={classes.submitFormItem}>
          <CustomButton
            htmlType="submit"
            variant={variants.primaryButton}
            title="Continue"
            formNoValidate
            customClass={classes.submitBtn}
            loading={loggingIn}
            disabled={loggingIn}
          />
        </Form.Item>
      </Form>
      <Paragraph className={classes.authCardFooterText}>
        By continuing you agree to Commutatus&#39;s
        <CustomLink href="#" size="tiny" customClass={classes.termsLink}>
          Terms and Conditions
        </CustomLink>
        .
      </Paragraph>
    </Col>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  onAuthStateChange: PropTypes.func.isRequired,
};

Login.defaultProps = {
  form: {},
  onAuthStateChange: () => {},
};

export default Login;
