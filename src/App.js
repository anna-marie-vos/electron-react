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

  return (
    <Router>
      <Switch>  
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
