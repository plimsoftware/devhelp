const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const db = require('./db/stores/topicItem');

global.db = db;

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
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`);
  
  mainWindow.on('close', () => {
    app.quit();
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function createAddTopicWindow() {
    addTopicWindow = new BrowserWindow({
      width: 340,
      height: 160,
      minWidth: 340,
      minHeight: 160,
      parent: mainWindow, // This to disable mainwindow when addtopic open
      modal: true,        // This to disable mainwindow when addtopic open
      title: 'Add Topic',
      icon: path.join(__dirname, './favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
        //preload: path.join(__dirname, './preload.js'),
      }
    });
  
    addTopicWindow.loadURL(
        isDev
        ? `http://localhost:3000/addtopic`
        : `file://${__dirname}/index.html#/addtopic`
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

ipcMain.on('closeAddTopic', (event, arg) => {
  addTopicWindow.close();
});

ipcMain.on('addTopic', (event, arg) => {
  addTopicWindow.close();
  mainWindow.webContents.send('addButtonTopic', arg);
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
