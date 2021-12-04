import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!) {
    login(input: { email: $email }) {
      accessToken
      expiresAt
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout(input: {})
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOtp(input: { email: $email, otp: $otp }) {
      accessToken
    }
  }
`;

export const RESEND_OTP = gql`
  mutation ResendOTP($email: String!) {
    resendOtp(input: { email: $email })
  }
`;
