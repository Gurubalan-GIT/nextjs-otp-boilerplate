import { secureAuthEndpoint } from "@helpers/ssr";
import { AUTH_TOKEN } from "@localization";
import { homeRedirect } from "@redirects";
import Auth from "./auth";

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  if (req?.cookies[AUTH_TOKEN]) {
    return await secureAuthEndpoint({ redirect: homeRedirect, ctx });
  }
  return {
    props: {},
  };
}

export default Auth;
