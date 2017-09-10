import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Dashboard from './components/Dashboard'
import About from './components/About'
import AdminsIndex from './components/AdminsIndex'
import AdminsNew from './components/AdminsNew'
import Layout from './layout'
import { createStore } from './state/createStore';
import { get } from 'lodash/fp'
import createHistory from 'history/lib/createHashHistory'
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { updateCFRSTokenAction } from './components/global/state'

const store = createStore();
const newHistory = createHistory();
const history = syncHistoryWithStore(newHistory, store);

class App extends React.Component {
  render() {
    return(
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={Layout}>
              <IndexRoute component={Dashboard}/>
              <Route path='/admins' component={AdminsIndex}/>
              <Route path='/admins/new' component={AdminsNew}/>
              <Route path='/about' component={About}/>
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}


const enhance = compose(
  lifecycle({
    componentDidMount() {
      store.dispatch(updateCFRSTokenAction(this.props.CSRFToken))
    }
  })
)
export default enhance(App);
