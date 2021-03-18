const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const db = require('./db/stores/topicItem');

global.db = db;
global.electroncategory = { category: '' };

if (isDev) {
  process.env.NODE_ENV = 'development';
} else {
  process.env.NODE_ENV = 'production';
}

let mainWindow;
let addCategoryWindow;
let addTopicWindow;
let deleteCategoryWindow;
let deleteTopicWindow;
let modifyCategoryWindow;
let markdownHelpWindow;
let modifyTopicWindow;
let addCategoryMenu = null;
let topicMenuActive = false;
let currentCat = '';

function createAddCategoryWindow() {
  addCategoryWindow = new BrowserWindow({
    width: 340,
    height: 140,
    resizable: false,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Add Category',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  addCategoryWindow.loadURL(
    isDev
      ? `http://localhost:3000/addcategory`
      : `file://${__dirname}/index.html#/addcategory`
  );

  if (process.platform !== 'darwin') {
    addCategoryWindow.setMenu(addCategoryMenu);
  }

  addCategoryWindow.on('closed', () => (addCategoryWindow = null));
}

function createAddTopicWindow() {
  addTopicWindow = new BrowserWindow({
    width: 340,
    height: 160,
    minWidth: 340,
    minHeight: 160,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Add Topic',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  addTopicWindow.loadURL(
    isDev
      ? `http://localhost:3000/addtopic`
      : `file://${__dirname}/index.html#/addtopic`
  );

  if (process.platform !== 'darwin') {
    addTopicWindow.setMenu(addCategoryMenu);
  }

  addTopicWindow.on('closed', () => (addTopicWindow = null));
}

function createDeleteCategoryWindow() {
  deleteCategoryWindow = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Delete Category',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  deleteCategoryWindow.loadURL(
    isDev
      ? `http://localhost:3000/deletecategory`
      : `file://${__dirname}/index.html#/deletecategory`
  );

  if (process.platform !== 'darwin') {
    deleteCategoryWindow.setMenu(addCategoryMenu);
  }

  deleteCategoryWindow.on('closed', () => (deleteCategoryWindow = null));
}

function createModifyCategoryWindow() {
  modifyCategoryWindow = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Modify Category',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  modifyCategoryWindow.loadURL(
    isDev
      ? `http://localhost:3000/modifycategory`
      : `file://${__dirname}/index.html#/modifycategory`
  );

  if (process.platform !== 'darwin') {
    modifyCategoryWindow.setMenu(addCategoryMenu);
  }

  modifyCategoryWindow.on('closed', () => (modifyCategoryWindow = null));
}

function createModifyTopicWindow() {
  modifyTopicWindow = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Modify Topic',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  modifyTopicWindow.loadURL(
    isDev
      ? `http://localhost:3000/modifytopic`
      : `file://${__dirname}/index.html#/modifytopic`
  );

  if (process.platform !== 'darwin') {
    modifyTopicWindow.setMenu(addCategoryMenu);
  }

  modifyTopicWindow.on('closed', () => (modifyTopicWindow = null));
}

function createDeleteTopicWindow() {
  deleteTopicWindow = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    parent: mainWindow, // This to disable mainwindow when addtopic open
    modal: true, // This to disable mainwindow when addtopic open
    title: 'Delete Topic',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js'),
    },
  });

  deleteTopicWindow.loadURL(
    isDev
      ? `http://localhost:3000/deletetopic`
      : `file://${__dirname}/index.html#/deletetopic`
  );

  if (process.platform !== 'darwin') {
    deleteTopicWindow.setMenu(addCategoryMenu);
  }

  deleteTopicWindow.on('closed', () => (deleteTopicWindow = null));
}

function createMarkdownHelpWindow() {
  markdownHelpWindow = new BrowserWindow({
    width: 350,
    height: 500,
    minWidth: 350,
    minHeight: 500,
    title: 'Markdown Help',
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  markdownHelpWindow.loadURL(
    isDev
      ? `http://localhost:3000/markdownhelp`
      : `file://${__dirname}/index.html#/markdownhelp`
  );

  if (process.platform !== 'darwin') {
    markdownHelpWindow.setMenu(addCategoryMenu);
  }

  markdownHelpWindow.on('closed', () => (markdownHelpWindow = null));
}

const menuTemplate = [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Home',
        click() {
          mainWindow.loadURL(
            isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`
          );
        },
      },
      {
        label: 'Check Server Status',
        enabled: false,
        click() {},
      },
      {
        label: 'Sync with Server',
        enabled: false,
        click() {},
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'win32' ? 'Alt+F4' : 'Cmd+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Category',
    submenu: [
      {
        label: 'Insert Category',
        click() {
          createAddCategoryWindow();
        },
      },
      {
        label: 'Delete Category',
        click() {
          createDeleteCategoryWindow();
        },
      },
      {
        label: 'Modify Category Name',
        click() {
          createModifyCategoryWindow();
        },
      },
    ],
  },
  {
    label: 'Topic',
    submenu: [
      {
        label: 'Insert Topic',
        click() {
          if (topicMenuActive) createAddTopicWindow();
        },
      },
      {
        label: 'Edit Topic',
        click() {
          if (topicMenuActive) mainWindow.webContents.send('editComment', '');
        },
      },
      {
        label: 'Delete Topic',
        click() {
          if (topicMenuActive) createDeleteTopicWindow();
        },
      },
      {
        label: 'Modify Topic Name',
        click() {
          if (topicMenuActive) createModifyTopicWindow();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Markdown tags',
        click() {
          createMarkdownHelpWindow();
        },
      },
    ],
  },
];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 840,
    minHeight: 560,
    title: 'Developer Help',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`
  );

  mainWindow.on('close', () => {
    app.quit();
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

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

ipcMain.on('closeAddCategory', () => {
  addCategoryWindow.close();
});

ipcMain.on('closeAddTopic', () => {
  addTopicWindow.close();
});

ipcMain.on('activateTopicMenu', (event, arg) => {
  topicMenuActive = true;
  currentCat = arg;
  global.electroncategory = { category: arg };
});

ipcMain.on('addCategory', (event, arg) => {
  addCategoryWindow.close();

  db.create({
    topictype: 'bt',
    topictext: arg,
    topicgroup: arg,
  });

  mainWindow.reload();
});

ipcMain.on('updateCategory', (event, arg) => {
  modifyCategoryWindow.close();

  db.updateCat(arg);
  db.updateTopicCat(arg);

  mainWindow.reload();
});

ipcMain.on('updateTopic', (event, arg) => {
  modifyTopicWindow.close();

  db.updateTopic(arg);

  mainWindow.reload();
});

ipcMain.on('updateComment', (event, arg) => {
  db.updateComment(arg);

  mainWindow.reload();
});

ipcMain.on('upTopicComment', (event, arg) => {
  db.upSaveComment(arg);

  mainWindow.reload();
});

ipcMain.on('downTopicComment', (event, arg) => {
  db.downSaveComment(arg);

  mainWindow.reload();
});

ipcMain.on('deleteTopic', (event, arg) => {
  deleteTopicWindow.close();

  db.deleteTopic(arg);

  mainWindow.reload();
});

ipcMain.on('deleteCategory', (event, arg) => {
  deleteCategoryWindow.close();

  db.deleteCategory(arg);

  mainWindow.reload();
});

ipcMain.on('deleteComment', (event, arg) => {
  db.deleteTopic(arg);

  mainWindow.reload();
});

ipcMain.on('addTopic', (event, arg) => {
  db.create({
    topictype: 'topic',
    topictext: arg.text,
    topicgroup: currentCat,
  });

  addTopicWindow.close();
  mainWindow.reload();
});

ipcMain.on('addTopicComment', (event, arg) => {
  db.create({
    topictype: arg.topictype,
    topictext: arg.text,
    topicparent: arg.topicparent,
    order: arg.order,
    topicgroup: arg.topicgroup,
  });

  mainWindow.reload();
});

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
        accelerator:
          process.platform === 'win32' ? 'Ctrl+Shift+I' : 'Cmd+Alt+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  };

  menuTemplate.push(devTemplate);
  if (process.platform !== 'darwin') {
    addCategoryMenu = Menu.buildFromTemplate([devTemplate]);
  }
}
