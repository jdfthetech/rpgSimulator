const { app, BrowserWindow, Menu } = require('electron')

require('electron-reload')(__dirname);

createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1340,
    height: 1100,
    webPreferences: {
      nodeIntegration: true
    }
  })

// make a custom menu for char class
//labels are a mix of arrays and dictionaries

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Characters',
        submenu: 
        [
          {label: 'New Character'},
          {label: 'Load Character'}
        ]
        },

    ]
    },
    //new label section
    {
      label: 'App Commands',
      submenu:
      [
        {label: 'Options'},
        {type: "separator"},
        {
        label: 'Exit', click(){
          app.quit();
        }
        }
      ]
    }    

  ])
  Menu.setApplicationMenu(menu);
  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }

})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.





