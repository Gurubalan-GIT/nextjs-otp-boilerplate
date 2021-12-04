import { gql } from "@apollo/client";

export const GET_AUTH_USER_DETAILS = gql`
  query GetAuthUserDetails {
    currentUser {
      email
      firstName
      lastName
      mobileNumber
    }
  }
`;
