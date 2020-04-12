const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

let mainWindow;
let imageWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  imageWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: mainWindow,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000': `file://${path.join(__dirname, '../build/index.html')}`
  );
  imageWindow.loadURL(
    isDev ? 'http://localhost:3000/image': `file://${path.join(__dirname, '../build/index.html')}`
  );
  
  mainWindow.on('closed', () => mainWindow = null);
  imageWindow.on('close', (event) => {
    event.preventDefault();
    imageWindow.hide();
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.allowRendererProcessReuse = true;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('/image', (event, arg) => {
  dialog.showOpenDialog({ 
    properties: ['openFile', 'multiSelections'], 
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ] 
  }).then(result => {
    if(result.canceled) {
      return;
    }
    //read image (note: use async in production)
    var img = fs.readFileSync(result.filePaths[0]).toString('base64');
    imageWindow.show();
    imageWindow.webContents.send('image', img );
    return;
  }).catch(err => {
    console.log(err);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
