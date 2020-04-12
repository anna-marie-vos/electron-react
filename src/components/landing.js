import React, { useState } from 'react';
import { Button, Paper, Typography, Card ,TextField } from '@material-ui/core';
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
  }
}));

function Landing () {
  const classes = useStyles();
  const [timer, setTimer] = useState(30);

  const handleClick = () => {
    ipcRenderer.send('/image');
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
          <Button variant="contained" 
            onClick={() => {
              setTimer(30);
            }}
          >
            30 seconds
          </Button>
          <Button variant="contained"
            onClick={() => {
              setTimer(60);
            }}
          >
            60 seconds
          </Button>
          <TextField
            id="standard-number"
            label="Custom timer (in seconds)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTimer(value);
            }}
          />
          <Button variant="contained">
            Pause / Play
          </Button>
          <Button variant="contained">
            Shuffle
          </Button>
        </div>
      </Card>
    </Paper>
  );

}

export default Landing;