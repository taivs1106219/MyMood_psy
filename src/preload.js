const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, args) => ipcRenderer.send(channel, args),
  invoke: (channel, args) => {
    return ipcRenderer.invoke(channel, args);
  },
  handle: (channel, callback) =>
    ipcRenderer.on(channel, (event, args) => callback(args)),
  removeIPCListener: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
