import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { loadState } from "@helpers/redux";
import { isSSR } from "@helpers/global";
import { combinedInitialState, ignoreStatesFromPersist } from "./states";
import { useMemo } from "react";
import { omit } from "lodash";

let store;

const persistedState = isSSR()
  ? omit(combinedInitialState, ignoreStatesFromPersist)
  : loadState(); // #NOTE: We are checking as there's no local storage or states on the server side.

const initStore = (preloadedState = persistedState) => {
  return createStore(reducers, preloadedState, applyMiddleware(thunk));
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (isSSR()) return _store;
  if (!store) store = _store;
  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
