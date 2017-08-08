import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import _Cloud from './components/Cloud';

import './App.css';

const history = createBrowserHistory();

const _Map = () => (
  <div className="module">
    <h1>Map</h1>
  </div>
)
const _Coach = () => (
  <div className="module">
    <h1>I'm a coach.</h1>
  </div>
)
const _Calculator = () => (
  <div className="module">
    <h1>Calculator</h1>
  </div>
)
const _NoMatch = () => (
  <div className="module">
    <h1>No Matches.</h1>
    <p>What are you looking for?</p>
  </div>
)
class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div className="App">
        <div className="App-header">跑向巅峰 - 曾经脚下的路</div>
        <ul>
          <li>
            <NavLink exact activeClassName='active' to='/'>Cloud</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/map'>Map</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/coach'>Coach</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/calculator'>Calculator</NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path='/' component={_Cloud} />
          <Route path='/map' component={_Map} />
          <Route path='/coach' component={_Coach} />
          <Route path='/calculator' component={_Calculator} />
          <Route component={_NoMatch} />
        </Switch>

        <div className="App-footer">
          <a href="http://www.weibo.com/m4jing" target="_blank" rel="noopener noreferrer">@m4jing</a>
          <a href="http://www.imajing.com.cn" target="_blank" rel="noopener noreferrer">Homepage</a>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
