import React, { useState } from 'react';
import { Button, Paper, Typography, Card ,TextField, IconButton, Avatar } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled, ShuffleOutlined} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
  },
  content: {
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    padding: 16,
    margin: 16
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around'
  }, 
  notSelected: {
    color: 'black',
  },
  selected: {
    color: 'black',
    backgroundColor: 'red',
  },

}));

function Landing () {
  const classes = useStyles();
  const [timer, setTimer] = useState(30);
  const [images, setImages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const handleClick = () => {
    ipcRenderer.send('getImages');
  };

  ipcRenderer.on('loadImages', (event, arg) => {
    setImages(arg);
  }).setMaxListeners(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if(!isWindowOpen) {
      ipcRenderer.send('showImages', {images, timer, isPlaying, isRandom});
      setIsWindowOpen(true);
    }
    ipcRenderer.send('pausePlay', { isPlaying, timer, isRandom });
  };

  return (
    <Paper className={classes.root}>
      <Card className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          Image shuffler
        </Typography>
        <div>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Select Images
          </Button>
        </div>
      </Card>

      <Card className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">Timers</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Select a timer for the next image to appear
        </Typography>
        <div className={classes.center}>
          <IconButton variant="contained" onClick={() => setTimer(30) } >
              <Avatar className={ timer === 30 ? classes.selected : classes.notSelected } > 30 s </Avatar>
          </IconButton>
          <IconButton variant="contained" onClick={() => setTimer(60) } >
            <Avatar className={ timer === 60 ? classes.selected : classes.notSelected } > 60 s </Avatar>
          </IconButton>
          <TextField
            id="standard-number"
            label="Custom timer (in seconds)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={timer}
            onChange={(e) => {
              if(e.target.value === ''){
                setTimer(0);
              } else {
                const value = Math.abs(parseInt(e.target.value));
                setTimer(value);
              }
            }}
          />
          <IconButton 
            variant="contained" 
            onClick={handlePlayPause} 
            aria-label={isPlaying ? 'Pause' : 'play' }
            disabled={images.length === 0}
            color={isPlaying ? 'primary': 'secondary'}
            size="medium"
          >
            { isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled /> }
          </IconButton>
          <IconButton 
            variant="contained"
            color={isRandom ? 'secondary' : 'default'} 
            onClick={ () => setIsRandom(!isRandom) }
          >
            <ShuffleOutlined />
          </IconButton>
        </div>
      </Card>
    </Paper>
  );

}

export default Landing;