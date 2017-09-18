import { createAction, handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { path } from 'lodash/fp';

const UPDATE_CFRS_TOKEN_ACTION = 'UPDATE_CFRS_TOKEN_ACTION';
export const updateCFRSTokenAction = createAction(UPDATE_CFRS_TOKEN_ACTION);
const xCFRSTokenPayload = (state, { payload }) => payload;
const xCFRSTokenReducer = handleAction(UPDATE_CFRS_TOKEN_ACTION, xCFRSTokenPayload, null);


export const UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION = 'UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION';
export const updateMessagesVisisbleAction = createAction(UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION);
const updateMessagesVisisblePayload = (state, { payload }) => payload;
const autoHiddenMessagesVisisbleReducer = handleAction(UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION,
                                             updateMessagesVisisblePayload, false);

export const SHOW_GENERAL_MESSAGE_ACTION = 'SHOW_GENERAL_MESSAGE_ACTION';
export const showGeneralMessageAction = createAction(SHOW_GENERAL_MESSAGE_ACTION);
const showGeneralMessagePayload = (state, { payload }) => payload;
const showGeneralMessageReducer = handleAction(SHOW_GENERAL_MESSAGE_ACTION,
                                               showGeneralMessagePayload,
    { visible: false,
        positive: true,
        negative: false,
        content: 'Welcome' });
export const globalReducer = combineReducers({
    xCFRSToken: xCFRSTokenReducer,
    autoHiddenMessagesVisisble: autoHiddenMessagesVisisbleReducer,
    showGeneralMessage: showGeneralMessageReducer,
});


export const xCFRSTokenSelector = path('global.xCFRSToken');
export const autoHiddenMessageVisibleSelector = path('global.autoHiddenMessagesVisisble');
export const showGeneralMessageSelector = path('global.showGeneralMessage');
