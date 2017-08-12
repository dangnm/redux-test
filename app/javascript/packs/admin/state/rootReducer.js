import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call'

const rootReducer = combineReducers({
    routing: routerReducer,
    ...apiReducers
})

export default rootReducer;
