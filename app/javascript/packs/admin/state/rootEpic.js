import { combineEpics } from 'redux-observable';
import adminNewEpic from '../components/AdminsNew/epic';
import adminEditEpic from '../components/AdminsEdit/epic';
import hideAllMessagesEpic from '../components/global/epic';

export default combineEpics(
    adminNewEpic,
    adminEditEpic,
    hideAllMessagesEpic,
);
