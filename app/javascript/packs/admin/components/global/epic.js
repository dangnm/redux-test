import 'rxjs/add/operator/delay';
import { updateMessagesVisisbleAction,
         showGeneralMessageAction,
         UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION } from './state';

const hideAllMessages = () => (dispatch) => {
    dispatch(updateMessagesVisisbleAction(false));
    dispatch(showGeneralMessageAction(
        {
            visible: false,
            positive: true,
            content: '',
        }
    ));
};

const isMessagesVisisbleTrue = action => action.type === UPDATE_AUTO_HIDDEN_MESSAGES_VISIBLE_ACTION
      && action.payload === true;

const hideAllMessagesEpic = action$ => action$
      .filter(isMessagesVisisbleTrue)
      .delay(5000)
      .map(hideAllMessages);

export default hideAllMessagesEpic;
