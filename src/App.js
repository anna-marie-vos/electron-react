import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import logo from './logo.svg';

import './App.css';
import Login from './components/login';
import Landing from './components/landing';

function App() {

  // const handleClick = () => {
  //   console.log('got here');
    // const remote = require('electron').remote;
    // const BrowserWindow = remote.BrowserWindow;
    // const win = new BrowserWindow({
    //   height: 600,
    //   width: 800,
    //   frame:false,
    //   webPreferences: {
    //     nodeIntegration: true,
    // }
    // });
    // win.loadURL(`file://${__dirname}/app.html#/login`);
  // };

  return (
    <div className="App">
      <Router>
        <Switch>            
          <Route exact path="/login">
            <Login />
          </Route>
          <Route to="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
