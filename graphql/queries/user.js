import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query GetUserDetails {
    currentUser {
      email
      firstName
      lastName
      dateOfBirth
      mobileNumber
      state
      college
      dateOfBirth
      profilePicture {
        filename
        url
      }
    }
  }
`;
