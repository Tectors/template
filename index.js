const { app, BrowserWindow } = require('electron')


const path = require('path')
const { sandboxed } = require('process')

// modify your existing createWindow() function
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true,
        contextIsolation: false, 
        enableRemoteModule: true
    },
    frame: false,
    contextIsolation: false,
    sandboxed: false,
    backgroundColor: '#FFF'
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })