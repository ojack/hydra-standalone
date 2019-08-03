// Modules to control application life and create native browser window
const electron = require('electron')

const {app, BrowserWindow} = electron

// enable hydra on OS with outdated gpu
//app.commandLine.appendSwitch('ignore-gpu-blacklist')

// enable transparent visuals
// app.commandLine.appendSwitch('enable-transparent-visuals')
// app.commandLine.appendSwitch('disable-gpu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

 const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({
  width: width,
    height: height,
    x: 0,
    y: 0,
  //  transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  //  alwaysOnTop: true,
  //  backgroundThrottling: false,
  //  hasShadow:false,
  //  frame: false
  })

//  mainWindow.maximize()

  mainWindow.loadURL(`file://${__dirname}/public/index.html`)

  // log screen info
  //console.log('SCREENS', electron.screen.getAllDisplays())
  //mainWindow.setIgnoreMouseEvents(true)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('certificate-error', function(event, webContents, url, error,
  certificate, callback) {
      event.preventDefault();
      callback(true);
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)

app.on('ready', () => setTimeout(createWindow, 500));

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
