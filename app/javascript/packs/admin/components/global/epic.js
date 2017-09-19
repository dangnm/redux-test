import 'rxjs/add/operator/delay';
import { updateMessagesVisisbleAction,
         UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION } from './state';

const hideAllMessages = () => (dispatch) => {
    dispatch(updateMessagesVisisbleAction(false));
};

const isMessagesVisisbleTrue = action => action.type === UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION
      && action.payload === true;

const hideAllMessagesEpic = action$ => action$
      .filter(isMessagesVisisbleTrue)
      .delay(5000)
      .map(hideAllMessages);

export default hideAllMessagesEpic;
