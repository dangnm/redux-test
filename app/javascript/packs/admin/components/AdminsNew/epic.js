import { ACTIONS } from 'redux-api-call';
import { camelizeKeys } from 'humps';
import { flow, path } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux'
import 'rxjs/add/operator/delay';
import { CREATE_ADMINS_ACTION } from './state'
import { updateMessagesVisisbleAction } from '../global/state'
import { showGeneralMessageAction } from '../global/state'

// Auto hidden error show epic

const isApiErrorReponse = action => action.type === ACTIONS.FAILURE
      && action.payload.name === CREATE_ADMINS_ACTION
      && flow(path('payload'), camelizeKeys, path('json.error.errors'))(action) != undefined;


const showAllMessages = data => (dispatch, getState) => {
    dispatch(updateMessagesVisisbleAction(true));
};

const showMessageErrorsEpic = action$ => action$
      .filter(isApiErrorReponse)
      .map(flow(path('payload.json'), showAllMessages));


// Sucessful message and redirect

const isApiCompletedReponse = action => action.type === ACTIONS.COMPLETE
      && action.payload.name === CREATE_ADMINS_ACTION

const redirectAndShowSuccessfulMessage = data => (dispatch, getState) => {
    dispatch(push('/admins'));
    dispatch(updateMessagesVisisbleAction(true));
    dispatch(showGeneralMessageAction(
        {
            visible: true,
            positive: true,
            content: 'Save successfully'
        }
    ));
};

const redirectAndShowSuccessfulMessageEpic = action$ => action$
      .filter(isApiCompletedReponse)
      .map(flow(path('payload.json'), redirectAndShowSuccessfulMessage));

export default combineEpics(
    showMessageErrorsEpic,
    redirectAndShowSuccessfulMessageEpic,
);
