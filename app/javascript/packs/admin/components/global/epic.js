import 'rxjs/add/operator/delay';
import { updateMessagesVisisbleAction } from './state';
import { UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION } from './state';

const hideAllMessages = data => (dispatch, getState) => {
    dispatch(updateMessagesVisisbleAction(false));
};

const isMessagesVisisbleTrue = action => action.type === UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION
      && action.payload === true;

const hideAllMessagesEpic = action$ => action$
      .filter(isMessagesVisisbleTrue)
      .delay(5000)
      .map(hideAllMessages);

export default hideAllMessagesEpic;
