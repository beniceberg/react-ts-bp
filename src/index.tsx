import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to my React, TypeScript and Jest Boilerplate</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
