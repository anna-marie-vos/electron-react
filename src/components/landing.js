import React from 'react';
import { Link } from 'react-router-dom';

function Landing () {
  console.log('Landing made it');

  return (
    <div>
      Landing
      <Link to="/login">Login</Link>
    </div>
  );

}

export default Landing;