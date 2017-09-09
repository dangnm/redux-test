import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import rootReducer from './rootReducer';
import { middleware as apiMiddleware } from 'redux-api-call'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';

const enhancers = compact([
  window.devToolsExtension && window.devToolsExtension(),
]);

const middlewares = applyMiddleware(
    apiMiddleware,
    routerMiddleware(hashHistory)
);

export const createStore = () => {
    const store = createReduxStore(rootReducer, compose(...enhancers), middlewares);
  return store;
};
