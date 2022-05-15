# NextJS - OTP Template
An OTP flow template with NextJS 11, Apollo Client, and Ant Design.

## Dependencies and Practices

- [Ant Design](https://ant.design/) (`*required`)
- [Server side cookies](pages/api)
- [Redux Persist](utils/helpers/redux.js)
- [Custom Error pages](pages/_error.js)
- [Apollo Client for GraphQL](https://www.apollographql.com/docs/react/) (`*required`)
- [Encryption for persisted Auth Tokens](utils/helpers/security.js)
- [jsconfig](jsconfig.json) file to avoid nested imports

## To-do

- Create an `.env.local` file for your environment variables from [here](https://www.notion.so/commutatus/OTP-Template-2cf1e46c27ce4b9eb65baa30fe744122).
  - If you're using next.config.js for handling your environment variables, the key values need not be prefixed with `NEXT_PUBLIC`

## Modules

- Error pages and error handling is something you can decide on your own how to handle. This has custom [500](pages/500.js), [404](pages/404.js) and [403](pages/403.js) pages.
  - [Error page](pages/_error.js)
  - [Error component](components/ErrorPage/index.js)
  - [Error page Layout](layouts/ErrorPageLayout/index.js)
- We use a Toast message component which is configure with Redux to give messages when user is logged in / OTP is resent, this can be optional.
- [Authentication components](components/Authentication/) (`*required`)
- Components & Adapters (`*required`)
  - [Adapters](components/adaptors/)
  - [CustomCountdown](components/CustomCountdown/index.js)
  - [FormErrorMessage](components/FormErrorMessage/index.js)
  - [InlineMessage](components/InlineMessage/index.js)
- [Auth Page](pages/auth.js) (`*required`)
- [SSR - Auth Gate Logics](utils/helpers/ssr.js) (`*required`)
- There would be some dependency on constants and values from [variants](utils/variants.js), [localization](utils/localization.js) & [constants](utils/constants.js), you can handle these on your own after looking into where these are used.

## Styles

- For styles, you will need to move all styles & component style modules.
  - For [globals](styles/globals.scss) you can choose to move these styles in whichever global style file you have set up.

## Expected GraphQL Schema
### Authentication
  - **AuthType**
  ```
  type AuthType {
    accessToken: String
    expiresAt: DateTime
  }
  ```
  - **Login**
  ```
  login(
    input: LoginInput!
  ): AuthType

  input LoginInput {
    email: String!
  }
  ```
  - **Logout**
  ```
  logout(
    input: LogoutInput!
  ): Boolean

  input LogoutInput {
  }
  ```
  - **Resend OTP**
  ```
  resendOtp(
    input: ResendOtpInput!
  ): Boolean

  input ResendOtpInput {
  email: String!
  }
  ```
  - **Verify OTP**
  ```
  verifyOtp(
    input: VerifyOtpInput!
  ): AuthType

  input VerifyOtpInput {
  email: String!
  otp: String!
  }
  ```
### User
  - **UserType**
  ```
  type User {
    firstName: String
    lastName: String
    profilePicture: Attachment
    userType: UserTypeEnum!
  }
  ```
  - **User Details**
  ```
  currentUser: Learner!
  ```
  - **Update User**
  ```
  userUpdate(
    input: UpdateInput!
  ): Learner
  ```
  - **LearnerType**
  ```
   type Learner {
    college: String
    dateOfBirth: DateTime
    email: String!
    firstName: String
    lastName: String
    location: LocationType
    mobileNumber: String
    pensilToken: String
    profilePicture: Attachment
    userType: UserTypeEnum!
  }
  ```
