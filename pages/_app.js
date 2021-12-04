import NextHead from "next/head";
import { Fragment } from "react";
import { Provider } from "react-redux";
import "@styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import { saveState } from "@helpers/redux";
import { throttle } from "lodash";
import { useApollo } from "@apollo-client";
import { useStore } from "@redux/store";

//disables console statements in production
process.env.NEXT_PUBLIC_APP_ENV === "production" &&
  (console.log = console.info = console.warn = console.error = () => {});

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo({
    initialState: pageProps.initialApolloState,
  });

  const store = useStore(pageProps.initialReduxState);

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 500)
  );

  return (
    <Fragment>
      <NextHead>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </NextHead>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
