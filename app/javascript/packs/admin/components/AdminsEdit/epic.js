import { ACTIONS } from 'redux-api-call';
import { camelizeKeys } from 'humps';
import { flow, path } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';
import 'rxjs/add/operator/delay';
import { UPDATE_ADMINS_ACTION } from './state';
import { updateMessagesVisisbleAction, showGeneralMessageAction } from '../global/state';

// Auto hidden error show epic

const isApiErrorReponse = action => action.type === ACTIONS.FAILURE
      && action.payload.name === UPDATE_ADMINS_ACTION
      && flow(path('payload'), camelizeKeys, path('json.error.errors'))(action) !== undefined;


const showAllMessages = () => (dispatch) => {
  dispatch(updateMessagesVisisbleAction(true));
};

const showMessageErrorsEpic = action$ => action$
      .filter(isApiErrorReponse)
      .map(flow(path('payload.json'), showAllMessages));

// Sucessful message and redirect

const isApiCompletedReponse = action => action.type === ACTIONS.COMPLETE
      && action.payload.name === UPDATE_ADMINS_ACTION;

const redirectAndShowSuccessfulMessage = () => (dispatch) => {
  dispatch(push('/admins'));
  dispatch(updateMessagesVisisbleAction(true));
  dispatch(showGeneralMessageAction(
    {
      visible: true,
      positive: true,
      content: 'Save successfully',
    }
  ));
};

const redirectAndShowSuccessfulMessageEpic = action$ => action$
      .filter(isApiCompletedReponse)
      .map(flow(path('payload.json'), redirectAndShowSuccessfulMessage));

export default combineEpics(
  showMessageErrorsEpic,
  redirectAndShowSuccessfulMessageEpic
);
