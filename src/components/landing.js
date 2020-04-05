import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Landing () {

  const handleClick = () => {
    ipcRenderer.send('/login');
  };

  return (
    <div>
      Landing
      <button onClick={handleClick}>Click me</button>
    </div>
  );

}

export default Landing;