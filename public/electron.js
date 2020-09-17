const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let addTopicWindow;
let addTopicMenu = null;

function createWindow() {
  mainWindow = new BrowserWindow({
      width: 900,
      height: 680,
      title: 'Developer Help',
      webPreferences: {
        nodeIntegration: true
    }
    });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.on('close', () => {
    app.quit();
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function createAddTopicWindow() {
    addTopicWindow = new BrowserWindow({
      width: 400,
      height: 600,
      minWidth: 300,
      minHeight: 100,
      title: 'Add Topic',
      icon: path.join(__dirname, './favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, './preload.js'),
      }
    });
  
    addTopicWindow.loadURL(
        isDev
        ? `http://localhost:3000/addtopic`
        : `file://${path.join(__dirname, `../build/index.html#/addtopic`)}`
    );
  
    if (process.platform !== 'darwin') {
        addTopicWindow.setMenu(addTopicMenu);
    }
  
    addTopicWindow.on("closed", () => (addTopicWindow = null));
}

app.on("ready", createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const menuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Insert Topic',
                click() {
                    createAddTopicWindow();
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform === 'win32' ? 'Alt+F4' : 'Cmd+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {  
    menuTemplate.unshift({});        
}

if (process.env.NODE_ENV !== 'production') {
    const devTemplate = {
        label: 'Dev',
        submenu: [
            { role: 'reload' },  
            {
                label: 'Debug',
                accelerator: process.platform === 'win32' ? 'Ctrl+Shift+I' : 'Cmd+Alt+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    };

    menuTemplate.push(devTemplate);
    if (process.platform !== 'darwin') {
        addTopicMenu = Menu.buildFromTemplate([devTemplate]);
    }
}
