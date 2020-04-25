import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    postition: 'relative',
  },
  timer: {
    position: 'absolute',
    left: 0,
  },
  blue: {
    color: 'white',
    backgroundColor: indigo[900],
  }
}));

function Image () {
  const classes = useStyles();
  const [indexes, setIndexes] = useState([]);
  const [max, setMax] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [images, setImages] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [random, setRandom] = useState(false);
  const [pause, setPause] = useState(false);

  const getRandomNuber = useCallback(() => {
    if(indexes.length >= max) {
      return; 
    }
    const newIndex = Math.floor(Math.random() * Math.floor(max));
    if(indexes.includes(newIndex)) {
      return getRandomNuber();
    } else {
      return newIndex;
    }
  }, [indexes, max]);

  useEffect(() => {
    if(indexes.length === 0) {
      return;
    }
    if (!timeRemaining ) {
      if (random) {
        const newIndex = getRandomNuber();
        if(!newIndex){
          setIndexes([0]);
        } else {
          setIndexes([...indexes, newIndex]);
        }
      } else {
        const newIndex = indexes[indexes.length - 1] + 1;
        setIndexes(newIndex >= max? [0]: [...indexes, newIndex]);
      }
      setTimeRemaining(maxTime);
      return;
    };
    const intervalId = setInterval(() => {
      setTimeRemaining(pause ? timeRemaining : timeRemaining - 1);
    }, 1000);
    return () => clearInterval(intervalId);
    
  }, [getRandomNuber, indexes, max, maxTime, pause, random, timeRemaining]);

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
      setIndexes([i]);
    } else {
      setIndexes([0]);
    }
  }).setMaxListeners(0);

  ipcRenderer.on('pausePlay', (event, args) => {
    const { isPlaying, isRandom, timer } = args;
    setPause(isPlaying);
    setMaxTime(timer);
    setRandom(isRandom);
    setTimeRemaining(timer);
  }).setMaxListeners(0);

  return (
    <div className={classes.root}>
      <div className={classes.timer}>
        <Avatar className={classes.blue}>{timeRemaining}</Avatar>
      </div>
      { images[indexes[indexes.length - 1]] && 
        <img 
          src={'data:image/png;base64,' + images[indexes[indexes.length - 1]]} 
          alt="img" style={{ maxWidth:'100%' }}
        />
      }
    </div>
  );

}

export default Image;