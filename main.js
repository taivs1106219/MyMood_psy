const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");
const dataPath = path.join(os.homedir(), ".mymood_psy");
const tar = require("tar");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "src", "preload.js"),
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
  ipcMain.handle("get-cases", async () => {
    const files = await fs.readdir(path.join(dataPath,"cases"));
    return JSON.stringify(files);
  });
  ipcMain.on("import-config", (e, [fileName, caseName]) => {
    tar.x(
      {
        f: fileName,
        C: path.join(dataPath, "cases"),
      },
      [],
      async(e) => {
        await fs.rename(
          path.join(dataPath,"cases", ".mymood_new"),
          path.join(dataPath,"cases", caseName)
        );
        win.webContents.send("import-completed");
      }
    );
  });
  ipcMain.handle("open-file", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
      filters: [{ name: "MyMood 設定檔", extensions: ["mmconf"] }],
    });
    if (canceled) {
      return "";
    } else {
      return filePaths[0];
    }
  });
  win.loadFile("dist/index.html");
};

function checkFileExists(path, callback) {
  return fs.access(path, fs.constants.F_OK);
}

async function main() {
  let checkpoint = 0;
  while (checkpoint < 1) {
    try {
      await checkFileExists(dataPath);
      checkpoint += 1;
    } catch (e) {
      await fs.mkdir(dataPath);
    }
  }

  while (checkpoint < 2) {
    try {
      await checkFileExists(path.join(dataPath, "cases"));
      checkpoint += 1;
    } catch (e) {
      await fs.mkdir(path.join(dataPath, "cases"));
    }
  }
  await app.whenReady();
  createWindow();
}

main();
