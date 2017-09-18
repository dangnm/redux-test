import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';
import { reducer as formReducer } from 'redux-form';
import { globalReducer } from './../components/global/state';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    global: globalReducer,
    ...apiReducers,
});

export default rootReducer;
