import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import rootReducer from './rootReducer';
import { middleware as apiMiddleware } from 'redux-api-call'

const enhancers = compact([
  window.devToolsExtension && window.devToolsExtension(),
]);

const middlewares = applyMiddleware(
    apiMiddleware
);

export const createStore = () => {
    const store = createReduxStore(rootReducer, compose(...enhancers), middlewares);
  return store;
};
