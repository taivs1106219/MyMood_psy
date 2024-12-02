const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");
const dataPath = path.join(os.homedir(), ".mymood_psy");
const tar = require("tar");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
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
    const files = await fs.readdir(path.join(dataPath, "cases"));
    return JSON.stringify(files);
  });
  ipcMain.on("import-config", (e, [fileName, caseName]) => {
    tar.x(
      {
        f: fileName,
        C: path.join(dataPath, "cases"),
      },
      [],
      async (e) => {
        await fs.rename(
          path.join(dataPath, "cases", ".mymood_new"),
          path.join(dataPath, "cases", caseName)
        );
        const psyConfig = JSON.parse(
          await fs.readFile(
            path.join(dataPath, "cases", caseName, "psyConfig.json")
          )
        );

        await fs.rm(path.join(dataPath, "cases", caseName, "config.json"));

        if (psyConfig.deleteMoodNote) {
          try {
            const userdata = JSON.parse(
              await fs.readFile(
                path.join(dataPath, "cases", caseName, "userdata.json")
              )
            );
            console.log(userdata);
            delete userdata["SiLiao"];
            const keys = Object.keys(userdata);
            keys.forEach((e) => {
              userdata[e].notes = "由用戶隱藏";
            });
            await fs.writeFile(
              path.join(dataPath, "cases", caseName, "userdata.json"),
              JSON.stringify(userdata)
            );
          } catch (e) {
            console.log(e);
          }
        }

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
  ipcMain.on("delete-case", async (e, name) => {
    await fs.rm(path.join(dataPath, "cases", name), { recursive: true });
    win.webContents.send("delete-completed", true);
  });
  ipcMain.on("rename-case", async (e, [oldName, newName]) => {
    try {
      await fs.rename(
        path.join(dataPath, "cases", oldName),
        path.join(dataPath, "cases", newName)
      );
      win.webContents.send("rename-completed");
    } catch (e) {
      win.webContents.send("rename-failed");
    }
  });
  ipcMain.handle("request-data", async (e, [caseName, fileName]) => {
    console.log(caseName, fileName);
    try {
      const filePath = path.join(dataPath, "cases", caseName, fileName);
      const data = await fs.readFile(filePath);
      return data.toString();
    } catch (e) {
      console.log(e);
    }
  });
  ipcMain.on("write-file", (e, [path, data]) => {
    fs.writeFile(path, data);
  });
  ipcMain.handle("get-datapath", async () => {
    return dataPath;
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
