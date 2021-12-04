import { initializeApollo } from "@apollo-client";
import { useMutation } from "@apollo/client";
import CustomButton from "@components/adaptors/CustomButton";
import CustomInput from "@components/adaptors/CustomInput";
import CustomLink from "@components/adaptors/CustomLink";
import FormErrorMessage from "@components/FormErrorMessage";
import { setSeverSideCookie } from "@helpers/auth";
import { logger } from "@helpers/logger";
import { encrypt } from "@helpers/security";
import { otpValidator } from "@helpers/validations";
import { fas } from "@icons";
import { HOME_ROUTE, LOGIN } from "@localization";
import { RESEND_OTP, VERIFY_OTP } from "@mutations/auth";
import { GET_USER_DETAILS } from "@queries/user";
import { helperActions, userActions } from "@redux/actions";
import classes from "@styles/auth.module.scss";
import { variants } from "@variants";
import { Col, Form, Typography } from "antd";
import { gqlErrors } from "graphql/errors";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const CustomCountdown = dynamic(() => import("@components/CustomCountdown"), {
  ssr: false,
});

const { Title, Paragraph, Text } = Typography;

const VerifyOTP = (props) => {
  const [showResendOTPCoolDownTimer, setShowResendOTPCoolDownTimer] =
    useState(false);
  const { form, onAuthStateChange } = props;
  const router = useRouter();
  const { getFieldValue, setFields } = form;
  const dispatch = useDispatch();
  const { userLoginAction, userUpdateAction } = bindActionCreators(
    userActions,
    dispatch
  );
  const { openToastMessage } = bindActionCreators(helperActions, dispatch);
  const [verifyOTP] = useMutation(VERIFY_OTP);
  const [resendOTP] = useMutation(RESEND_OTP);
  const [loadingOTP, setLoadingOTP] = useState(false);

  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (!showResendOTPCoolDownTimer) {
      setLoadingOTP(true);
      const email = getFieldValue("email");
      try {
        const { data } = await resendOTP({
          variables: {
            email,
          },
        });
        if (data?.resendOtp) {
          setLoadingOTP(false);
          openToastMessage({
            variant: variants.positiveToastMessage,
            title: `A new OTP has been sent`,
          });
          setShowResendOTPCoolDownTimer(true);
        }
      } catch (error) {
        setLoadingOTP(false);
        const gqlError = error.graphQLErrors[0];
        if (gqlError) openToastMessage({ variant: variants.error });
      }
    }
  };

  const handleVerifyOTP = async (email, otp) => {
    try {
      const { data } = await verifyOTP({ variables: { email, otp } });
      if (data?.verifyOtp?.accessToken) {
        const encryptedAuthToken = encrypt(data.verifyOtp.accessToken);
        userUpdateAction({
          encryptedAuthToken,
        });
        setSeverSideCookie(data.verifyOtp.accessToken, async () => {
          const apolloClient = initializeApollo({
            initialState: null,
            ctx: null,
          });
          try {
            const { data: userData } = await apolloClient.query({
              query: GET_USER_DETAILS,
            });
            if (userData?.currentUser) {
              setLoadingOTP(false);
              const {
                firstName,
                lastName,
                mobileNumber,
                state,
                college,
                profilePicture,
              } = userData.currentUser;
              if (!firstName || !lastName || !mobileNumber) {
                router.reload();
              }
              if (firstName && lastName && mobileNumber) {
                userLoginAction();
                userUpdateAction({
                  firstName,
                  lastName,
                  mobileNumber,
                  state,
                  college,
                  profilePicture,
                });
                router.replace(HOME_ROUTE);
              }
            }
          } catch (error) {
            setLoadingOTP(false);
            const gqlError = error.graphQLErrors[0];
            if (gqlError) {
              logger.print(gqlError.message);
            }
          }
        });
      }
    } catch (error) {
      setLoadingOTP(false);
      const gqlError = error.graphQLErrors[0];
      if (gqlError?.message === gqlErrors.messages.verifyOTP) {
        setFields([
          {
            name: "otp",
            errors: [<FormErrorMessage key="otp-error-message" type="otp" />],
          },
        ]);
      } else {
        logger.print(gqlError);
      }
    }
  };

  const onFinish = (values) => {
    setLoadingOTP(true);
    const { otp } = values;
    handleVerifyOTP(getFieldValue("email"), otp);
  };

  return (
    <Col className={classes.otpWrapper}>
      <CustomButton
        variant={variants.ghostButton}
        onClick={() => onAuthStateChange(LOGIN)}
        iconButton
        icon={fas.faArrowLeft}
        customClass={classes.backBtn}
      />
      <Title className={classes.authCardTitle}>Enter OTP</Title>
      <Paragraph className={classes.authCardSubText}>
        We&#39;ve sent the OTP to
        <Text className={classes.mailText}> {getFieldValue("email")}</Text>
      </Paragraph>
      <Form
        form={form}
        name="basic"
        initialValues={{
          otp: "",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              type: "string",
              validator: otpValidator,
            },
          ]}
        >
          <CustomInput
            formItem
            label="OTP"
            variant={variants.numberInput}
            placeholder="OTP"
            extraLabelRight={
              <Fragment>
                {showResendOTPCoolDownTimer && (
                  <CustomCountdown
                    value={30}
                    onFinish={() => {
                      setShowResendOTPCoolDownTimer(false);
                    }}
                    customClass={classes.countdownOTPWrapper}
                  />
                )}
                <CustomLink
                  disabled={showResendOTPCoolDownTimer}
                  nativeLink
                  onClick={handleResendOTP}
                  size="small"
                  color="blue"
                >
                  Resend OTP
                </CustomLink>
              </Fragment>
            }
          />
        </Form.Item>

        <Form.Item className={classes.submitFormItem}>
          <CustomButton
            loading={loadingOTP}
            disabled={loadingOTP}
            variant={variants.primaryButton}
            formNoValidate
            htmlType="submit"
            title="Continue"
            customClass={classes.submitBtn}
          />
        </Form.Item>
      </Form>
    </Col>
  );
};

VerifyOTP.propTypes = {
  form: PropTypes.object.isRequired,
  onAuthStateChange: PropTypes.func.isRequired,
};

VerifyOTP.defaultProps = {
  form: {},
  onAuthStateChange: () => {},
};

export default VerifyOTP;
