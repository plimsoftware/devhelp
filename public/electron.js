const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
      width: 900,
      height: 680,
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
    // {}, No MacOS acrescenta-se esta linha vazia extra
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Insert Topic',
                click() {
                    
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

if (process.platform === 'darwin') {  //Usando a variável de sistema do node, podemos verificar qual o OS que está a correr
    menuTemplate.unshift({});         // Se for MacOS acrescenta {} no template7
}

if (process.env.NODE_ENV !== 'production') {
    //development
    //production
    //test... etc

    const devTemplate = {
        label: 'Dev',
        submenu: [
            { role: 'reload' },  //Com esta funcionalidade do electron não precisamos de indicar label, accelerator, click
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
    /*if (process.platform !== 'darwin') {
        commentMenu = Menu.buildFromTemplate([devTemplate]);
    }*/
}
