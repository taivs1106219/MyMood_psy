const { app, BrowserWindow, ipcMain } = require("electron");
const path=require("path")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname,"src","preload.js"),
    },
  });
  ipcMain.on("close-window", () => {
    win.close();
  });
  ipcMain.on("maximize-window", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });
  win.loadFile("dist\\index.html");
};

app.whenReady().then(() => {
  createWindow();
});
