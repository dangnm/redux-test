import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import rootReducer from './rootReducer';

const enhancers = compact([
  window.devToolsExtension && window.devToolsExtension(),
]);

export const createStore = () => {
  const store = createReduxStore(rootReducer, compose(...enhancers));
  return store;
};

export const store = createStore();
