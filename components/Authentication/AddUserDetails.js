import { useMutation } from "@apollo/client";
import CustomButton from "@components/adaptors/CustomButton";
import CustomInput from "@components/adaptors/CustomInput";
import CustomLink from "@components/adaptors/CustomLink";
import FormErrorMessage from "@components/FormErrorMessage";
import { phoneNumberValidator } from "@helpers/validations";
import { HOME_ROUTE, LOGIN } from "@localization";
import { UPDATE_AUTH_USER_DETAILS } from "@mutations/user";
import { helperActions, userActions } from "@redux/actions";
import classes from "@styles/auth.module.scss";
import { variants } from "@variants";
import { Col, Form, Row, Typography } from "antd";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const { Title, Paragraph, Text } = Typography;

const AddUserDetails = (props) => {
  const { form, onAuthStateChange, nextProps } = props;
  const router = useRouter();
  const { getFieldValue } = form;
  const dispatch = useDispatch();
  const { userUpdateAction, userLoginAction } = bindActionCreators(
    userActions,
    dispatch
  );
  const { openToastMessage } = bindActionCreators(helperActions, dispatch);
  const [updateUserDetails] = useMutation(UPDATE_AUTH_USER_DETAILS);
  const [updatingUserDetails, setUpdatingUserDetails] = useState(false);

  const handleUpdateUserDetails = async (firstName, lastName, phoneNumber) => {
    try {
      const { data } = await updateUserDetails({
        variables: { firstName, lastName, mobileNumber: phoneNumber },
      });
      if (data?.userUpdate) {
        setUpdatingUserDetails(false);
        const { email, firstName, lastName, mobileNumber } = data.userUpdate;
        userUpdateAction({
          email,
          firstName,
          lastName,
          mobileNumber,
        });
        userLoginAction();
        router.replace(HOME_ROUTE);
      }
    } catch (error) {
      setUpdatingUserDetails(false);
      const gqlError = error.graphQLErrors[0];
      if (gqlError) {
        openToastMessage({ variant: variants.error });
      }
    }
  };

  const onFinish = (values) => {
    setUpdatingUserDetails(true);
    const { firstName, lastName, phoneNumber } = values;
    handleUpdateUserDetails(firstName, lastName, phoneNumber);
  };

  return (
    <Col className={classes.signUpWrapper}>
      <Title className={classes.authCardTitle}>Just a few more details</Title>
      <Paragraph className={classes.authCardSubText}>
        Your account has been created under the email
        <Text className={classes.mailText}>
          {" "}
          {nextProps?.userDetails?.email ?? getFieldValue("email")}
        </Text>
        .
        <CustomLink
          nativeLink
          onClick={(e) => {
            e.preventDefault();
            onAuthStateChange(LOGIN);
          }}
          customClass={classes.notYouLink}
        >
          Not you?
        </CustomLink>
      </Paragraph>
      <Form
        form={form}
        name="basic"
        initialValues={{
          firstName: nextProps?.userDetails?.firstName ?? "",
          lastName: nextProps?.userDetails?.lastName ?? "",
          phoneNumber: nextProps?.userDetails?.mobileNumber ?? "",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: <FormErrorMessage />,
                },
              ]}
            >
              <CustomInput
                formItem
                label="First Name"
                variant={variants.textInput}
                placeholder="First name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: <FormErrorMessage />,
                },
              ]}
            >
              <CustomInput
                formItem
                label="Last Name"
                variant={variants.textInput}
                placeholder="Last Name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              validator: phoneNumberValidator,
            },
          ]}
        >
          <CustomInput
            formItem
            label="Phone Number"
            variant={variants.numberInput}
            placeholder="Phone Number"
          />
        </Form.Item>

        <Form.Item className={classes.submitFormItem}>
          <CustomButton
            loading={updatingUserDetails}
            disabled={updatingUserDetails}
            variant={variants.primaryButton}
            htmlType="submit"
            formNoValidate
            title="Continue"
            customClass={classes.submitBtn}
          />
        </Form.Item>
      </Form>
    </Col>
  );
};

AddUserDetails.propTypes = {
  form: PropTypes.object.isRequired,
  onAuthStateChange: PropTypes.func.isRequired,
  nextProps: PropTypes.object,
};

AddUserDetails.defaultProps = {
  form: {},
  onAuthStateChange: () => {},
  nextProps: null,
};

export default AddUserDetails;
