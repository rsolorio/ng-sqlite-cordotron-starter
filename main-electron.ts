import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as remoteMain from '@electron/remote/main';
import * as url from 'url';
import * as path from 'path';

let mainWindow: BrowserWindow;
const appName = 'ng-sqlite-cordotron-starter';

console.log('Bootstrapping Electron in main-electron.ts');

// Detect serve mode (Development mode)
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');
remoteMain.initialize();

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });
  mainWindow.maximize();
  remoteMain.enable(mainWindow.webContents);

  if (serve) {
    console.log('Loading electron from localhost with reload capability.');
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  } else {
    console.log('Loading electron from dist folder without reload capability.');
    const sitePath = path.join(__dirname, `/dist/${appName}/index.html`);
    mainWindow.loadURL(
      url.format({
        pathname: sitePath,
        protocol: 'file',
        slashes: true,
      }),
    );
  }

  //mainWindow.setMenuBarVisibility(false);

  const iconPath = path.join(__dirname, `/dist/${appName}/favicon.ico`);
  //const iconPath = path.join(__dirname + '\\src\\favicon.ico');
  //const iconPath = 'http://localhost:4200/favicon.ico';
  try {
    mainWindow.setIcon(iconPath);
  }
  catch (err) {
    console.log('Error setting icon at: ' + iconPath);
    console.log(err);
  }
  

  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });

}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }

      ipcMain.handle('openFolderDialog', (e, options) => {
        options = options ? options : {};
        options.properties = ['openDirectory'];
        return dialog.showOpenDialogSync(options);
      });

      ipcMain.handle('openDevTools', () => {
        mainWindow.webContents.openDevTools();
      });
    });

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  });
} catch (e) {
  console.log(e);
}
