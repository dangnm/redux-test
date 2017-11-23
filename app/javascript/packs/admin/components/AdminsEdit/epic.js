import { ACTIONS } from 'redux-api-call';
import { flow, path } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';
import 'rxjs/add/operator/delay';
import { UPDATE_ADMINS_ACTION } from './state';
import { updateMessagesVisisbleAction, showGeneralMessageAction } from '../global/state';

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
  redirectAndShowSuccessfulMessageEpic
);
