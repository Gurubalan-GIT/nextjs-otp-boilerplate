import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getPersistedAuthToken } from "@persistance";
import { isSSR } from "@helpers/global";
import { AUTH_TOKEN } from "@localization";
import merge from "deepmerge";
import { isEqual } from "lodash";
import { useMemo } from "react";

let apolloClient;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

const getAuthLink = (ctx) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization:
          Boolean(ctx) || isSSR()
            ? ctx?.req?.cookies[AUTH_TOKEN]
            : getPersistedAuthToken(),
      },
    };
  });
};

const createApolloClient = (ctx) => {
  return new ApolloClient({
    ssrMode: Boolean(ctx) || isSSR(),
    link: from([getAuthLink(ctx), httpLink]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = ({ initialState = null, ctx = null }) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);
  if (initialState) {
    const existingCache = _apolloClient.extract();
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const mergedCache = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(mergedCache);
  }
  if (isSSR() || Boolean(ctx)) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

/* NOTE: We want the Apollo client instance to be updated only when the cache value has changed, 
let’s use a useMemo hook to achieve that. The useApollo function is defined which calls a useMemo 
hook which returns the memoized value of the Apollo client returned by the call to initializeApollo
and it is recomputed only when the initialState value changes. This returns the Apollo client instance. */

export const useApollo = ({ initialState }) => {
  const store = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  );
  return store;
};
