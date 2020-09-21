const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const db = require('./db/stores/topicItem');

global.db = db;

let mainWindow;
let addCategoryWindow;
let addTopicWindow;
let addCategoryMenu = null;
let topicMenuActive = false;
let currentCat = '';

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

function createAddCategoryWindow() {
    addCategoryWindow = new BrowserWindow({
      width: 340,
      height: 160,
      minWidth: 340,
      minHeight: 160,
      parent: mainWindow, // This to disable mainwindow when addtopic open
      modal: true,        // This to disable mainwindow when addtopic open
      title: 'Add Category',
      icon: path.join(__dirname, './favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
        //preload: path.join(__dirname, './preload.js'),
      }
    });
  
    addCategoryWindow.loadURL(
        isDev
        ? `http://localhost:3000/addcategory`
        : `file://${__dirname}/index.html#/addcategory`
    );
  
    if (process.platform !== 'darwin') {
        addCategoryWindow.setMenu(addCategoryMenu);
    }
  
    addCategoryWindow.on("closed", () => (addCategoryWindow = null));
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
    addTopicWindow.setMenu(addCategoryMenu);
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

ipcMain.on('closeAddCategory', (event, arg) => {
  addCategoryWindow.close();
});

ipcMain.on('closeAddTopic', (event, arg) => {
  addTopicWindow.close();
});

ipcMain.on('activateTopicMenu', (event, arg) => {
  topicMenuActive = true;
  currentCat = arg;
});

ipcMain.on('addCategory', (event, arg) => {
  addCategoryWindow.close();

  db.create({
    topictype: 'bt',
    topictext: arg,
    topicgroup:''
  });

  mainWindow.reload();
});

ipcMain.on('addTopic', (event, arg) => {
  db.create({
    topictype: 'topic',
    topictext: arg.text,
    topicgroup: currentCat
  });

  addTopicWindow.close();
  mainWindow.reload();
});

const menuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform === 'win32' ? 'Alt+F4' : 'Cmd+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
      label: 'Category',
      submenu: [
          {
              label: 'Insert Category',
              click() {
                createAddCategoryWindow();
              }
          }
      ]
  },
  {
    label: 'Topic',
    submenu: [
        {
            label: 'Insert Topic',
            click() {
              if (topicMenuActive) createAddTopicWindow();
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
        addCategoryMenu = Menu.buildFromTemplate([devTemplate]);
    }
}
