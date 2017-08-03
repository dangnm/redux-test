import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Dashboard from './components/Dashboard'
import About from './components/About'
import Layout from './layout'
import { createStore } from './state/createStore';
import { get } from 'lodash/fp'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

const store = createStore();
const newHistory = createHashHistory();
/* const history = syncHistoryWithStore(newHistory, store);*/

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Inbox</h2>
        <Provider store={store}>
          <Router history={newHistory}>
            <Layout>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/about' component={About}/>
            </Layout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
