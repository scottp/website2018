import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown';


class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      page: "",
    };
    this.loadContent();
  }

  loadContent = () => {
    var self = this;
    // XXX configurable Version and & googleId
    fetch('/wiki/test.md', {
      method: 'GET',
      // credentials: 'include',
    })
    .then(function(response) {
      console.log("GOT", response);
      return response.text().then(function(pagetext) {
        self.setState({
          page: pagetext,
        });
      });
      return;
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>
          <ReactMarkdown source={this.state.page} />
        </pre>
      </div>
    );
  }
}

export default App;
