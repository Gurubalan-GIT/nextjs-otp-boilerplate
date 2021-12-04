import { gql } from "@apollo/client";

export const UPDATE_AUTH_USER_DETAILS = gql`
  mutation UpdateAuthUserDetails(
    $firstName: String!
    $lastName: String!
    $mobileNumber: String!
  ) {
    userUpdate(
      input: {
        firstName: $firstName
        lastName: $lastName
        mobileNumber: $mobileNumber
      }
    ) {
      firstName
      lastName
      mobileNumber
    }
  }
`;
