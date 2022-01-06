import { initializeApollo } from "@apollo-client";
import { ADD_USER_DETAILS, AUTH_TOKEN, HOME_ROUTE } from "@localization";
import { GET_AUTH_USER_DETAILS } from "@queries/auth";
import { GET_USER_DETAILS } from "@queries/user";
import { rootRedirect } from "@redirects";
import { logger } from "./logger";

export const secureAuthEndpoint = async ({ redirect, ctx }) => {
  const { req } = ctx;
  const apolloClient = initializeApollo({ initialState: null, ctx });
  try {
    const { data } = await apolloClient.query({
      query: GET_AUTH_USER_DETAILS,
    });
    if (data?.currentUser) {
      const { firstName, lastName, mobileNumber } = data.currentUser;
      if (!firstName || !lastName || !mobileNumber) {
        return {
          props: {
            nextProps: {
              authState: ADD_USER_DETAILS,
              userDetails: {
                email: data.currentUser?.email ?? "",
                firstName,
                lastName,
                mobileNumber,
                authToken: req?.cookies[AUTH_TOKEN],
              },
            },
            initialApolloState: apolloClient.cache.extract(),
          },
        };
      }
      if (firstName && lastName && mobileNumber) {
        return {
          redirect,
        };
      }
    }
  } catch (error) {
    const gqlError = error.graphQLErrors[0];
    if (gqlError) {
      // NOTE: This is a temporary solution to handle the case where the user has wrong authentication key, we would need to just delete the cookie and redirect to login page
      return;
    }
  }
};

export const secureAuthenticatedEndpoints = async ({
  redirect = rootRedirect,
  ctx,
  origin = "/",
}) => {
  const apolloClient = initializeApollo({ initialState: null, ctx });
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_DETAILS,
    });
    if (data?.currentUser) {
      const {
        email,
        firstName,
        lastName,
        mobileNumber,
        dateOfBirth,
        state,
        college,
        profilePicture,
      } = data.currentUser;
      if (!firstName || !lastName || !mobileNumber) {
        return {
          body: {
            redirect,
          },
        };
      }
      if (firstName && lastName && mobileNumber) {
        let nextProps = {
          userDetails: {
            email,
            firstName,
            lastName,
            mobileNumber,
            dateOfBirth,
            state,
            college,
            profilePicture,
            authToken: ctx.req?.cookies[AUTH_TOKEN],
          },
        };
        let ssrResponse = {
          props: {
            initialApolloState: apolloClient.cache.extract(),
            nextProps,
          },
        };
        switch (origin) {
          case HOME_ROUTE: {
            /* Have your respective authenticated page queries here and update it as a prop inside the next props object.
            We do this here so we have a single point of entry for all authenticated pages and we cache the queries, which is important, keep 
            in mind the apollo client initialized is the same here. If we just initialize apollo clients, the queries will not be cached centrally. */
            return {
              authenticated: true,
              ssrResponse: {
                ...ssrResponse,
                props: {
                  ...ssrResponse.props,
                  initialApolloState: apolloClient.cache.extract(),
                  nextProps,
                },
              },
            };
          }
          default: {
            return {
              authenticated: true,
              body: {
                ...ssrResponse.props,
              },
              ssrResponse,
            };
          }
        }
      }
    }
  } catch (error) {
    const gqlError = error.graphQLErrors[0];
    if (gqlError) {
      logger.print(gqlError.message);
    }
  }
};
