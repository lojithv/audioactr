// ./public/electron.js
const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
var childProcess = require('child_process');

var python = childProcess.spawn(`python ./backend/app.py ${5000}`, { detached: true, shell: true, stdio: 'inherit' });

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  python?.stdout?.on('data', function (data) {
    console.log("data: ", data.toString('utf8'));
  });
  python?.stderr?.on('data', (data) => {
    console.log(`stderr: ${data}`); // when error
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    python.kill();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
