import React, { Component } from 'react';

import Cloud from './components/Cloud';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Run2Top</h2>
        </div> */}
        <div className="App-header">跑向巅峰 - 曾经脚下的路</div>
        <Cloud />
        <div className="App-footer">
          <a href="http://www.weibo.com/m4jing" target="_blank" rel="noopener noreferrer">@m4jing</a>
          <a href="http://www.imajing.com.cn" target="_blank" rel="noopener noreferrer">Homepage</a>
        </div>
      </div>
    );
  }
}

export default App;
