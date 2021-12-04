import { initializeApollo } from "@apollo-client";
import { useMutation } from "@apollo/client";
import CustomButton from "@components/adaptors/CustomButton";
import {
  removeFirstTimeLoginStatus,
  removeServerSideCookie,
} from "@helpers/auth";
import { secureAuthenticatedEndpoints } from "@helpers/ssr";
import { AUTH_TOKEN, ROOT_ROUTE } from "@localization";
import { LOGOUT } from "@mutations/auth";
import { clearReduxPersist } from "@persistance";
import { rootRedirect } from "@redirects";
import { userActions } from "@redux/actions";
import { variants } from "@variants";
import { Col } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const home = ({ nextProps }) => {
  console.log(nextProps);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userResetAction } = bindActionCreators(userActions, dispatch);
  const [logout] = useMutation(LOGOUT);

  const handleLogOut = async (e) => {
    e.preventDefault();
    const apolloClient = initializeApollo({ initialState: null, ctx: null });
    try {
      const { data } = await logout();
      if (data?.logout) {
        removeServerSideCookie(() => {
          userResetAction();
          apolloClient.resetStore();
          removeFirstTimeLoginStatus();
          clearReduxPersist();
          router.replace(ROOT_ROUTE);
        });
      }
    } catch (error) {
      const gqlError = error.graphQLErrors[0];
      if (gqlError) logger.warn(gqlError.message);
    }
  };

  return (
    <Col>
      <span>Authenticated page</span>
      <br></br>
      <CustomButton
        variant={variants.ghostButton}
        title="Logout"
        size="small"
        onClick={handleLogOut}
      />
    </Col>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  if (req?.cookies[AUTH_TOKEN]) {
    let response = await secureAuthenticatedEndpoints({ ctx });
    if (!response?.authenticated) {
      return response.body;
    }
    if (response?.authenticated) {
      return {
        props: {
          initialApolloState: response?.body?.initialApolloState,
          nextProps: response?.body?.nextProps,
        },
      };
    }
  } else {
    return {
      redirect: rootRedirect,
    };
  }
}

export default home;
