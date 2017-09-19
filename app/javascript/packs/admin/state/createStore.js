import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import { middleware as apiMiddleware } from 'redux-api-call';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';

const enhancers = compact([
    window.devToolsExtension && window.devToolsExtension(),
]);

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    epicMiddleware,
    routerMiddleware(hashHistory),
);

export const createStore = () => {
    const store = createReduxStore(rootReducer, compose(...enhancers), middlewares);
    return store;
};
