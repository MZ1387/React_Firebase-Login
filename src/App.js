import React, { Component } from 'react';
import './App.css';
import Auth from './auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Login</h2>
        </div>
        <Auth />
      </div>
    );
  }
}

export default App;
