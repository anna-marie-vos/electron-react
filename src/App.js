import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import logo from './logo.svg';

import './App.css';
import Image from './components/image';
import Landing from './components/landing';

function App() {

  return (
    <Router>
      <Switch>  
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/image">
          <Image />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
