import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call'

const initialAdmins = [
    { id: '1', email: 'test1@test.com', created_at: 26},
    { id: '2', email: 'test2@test.com', created_at: 26},
    { id: '3', email: 'test3@test.com', created_at: 26},
];

export const adminsReducer = (state = initialAdmins, action) => {
    return state;
};

const reducers  = Object.assign({}, apiReducers, {routing: routerReducer, admins: adminsReducer})

const rootReducer = combineReducers(reducers)

export default rootReducer;
