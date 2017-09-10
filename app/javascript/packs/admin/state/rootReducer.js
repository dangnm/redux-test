import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    ...apiReducers
})

export default rootReducer;
