import { createAction, handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { path } from 'lodash/fp';

const UPDATE_CFRS_TOKEN_ACTION = 'UPDATE_CFRS_TOKEN_ACTION';
export const updateCFRSTokenAction = createAction(UPDATE_CFRS_TOKEN_ACTION);
const xCFRSTokenPayload = (state, { payload }) => payload;
const xCFRSTokenReducer = handleAction(UPDATE_CFRS_TOKEN_ACTION, xCFRSTokenPayload, null);

export const globalReducer = combineReducers({
    xCFRSToken: xCFRSTokenReducer
});


export const xCFRSTokenSelector = path('global.xCFRSToken');
