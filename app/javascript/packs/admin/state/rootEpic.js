import { combineEpics } from 'redux-observable';
import adminNewEpic from '../components/AdminsNew/epic'
import hideAllMessagesEpic from '../components/global/epic'

export default combineEpics(
    adminNewEpic,
    hideAllMessagesEpic,
);
