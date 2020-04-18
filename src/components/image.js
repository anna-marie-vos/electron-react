import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    postition: 'relative',
  },
  timer: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    width: 50
  }
}));

function Image () {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [images, setImages] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [random, setRandom] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (!timeRemaining) {
      if (random) {
        const newIndex = Math.floor(Math.random() * Math.floor(max));
        setIndex(newIndex);
      } else {
        const newIndex = index + 1;
        setIndex(newIndex >= max? 0: newIndex);       
      }
      setTimeRemaining(maxTime);
      return;
    };
     
    const intervalId = setInterval(() => {
      setTimeRemaining(pause ? timeRemaining : timeRemaining - 1);
    }, 1000);
    return () => clearInterval(intervalId);
    
  }, [index, max, maxTime, pause, random, timeRemaining]);

  ipcRenderer.on('showImages', (event, args) => {
    const {images, timer, isRandom} = args;
    setMaxTime(timer);
    setMax(images.length);
    setRandom(isRandom);
    setImages(images);
    setTimeRemaining(timer);
    setPause(true);

    if(isRandom) {
      const i = Math.floor(Math.random() * Math.floor(max));
      setIndex( i );
    }
  });

  ipcRenderer.on('pausePlay', (event, args) => {
    const { isPlaying } = args;
    setPause(isPlaying);
  });

  return (
    <div className={classes.root}>
      <div className={classes.timer}>
        <p>{timeRemaining + ' s'}</p>
      </div>
      <img src={'data:image/png;base64,' + images[index]} alt="img" style={{ maxWidth:'100%' }}/>
    </div>
  );

}

export default Image;