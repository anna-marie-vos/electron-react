import React, { useState } from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Image () {
  const [img, setImg] = useState('');

  ipcRenderer.on('image', (event, arg)=>{
    setImg(arg);
  });

  return (
    <div>
      <img src={'data:image/png;base64,' + img} alt="img" style={{ maxWidth:'100%' }}/>
    </div>
  );

}

export default Image;