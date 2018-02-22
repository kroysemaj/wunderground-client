import React, { Component } from 'react';
import './App.css';
import ContentTabs from './tabs/ContentTabs'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://icons.wxug.com/graphics/wu2/logo_130x80.png" className="App-logo" alt="logo" />
          <h1 className="App-title">What's the Weather?</h1>
        </header>
        <ContentTabs />
      </div>
    );
  }
}

export default App;
