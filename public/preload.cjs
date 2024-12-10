const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('connection', {
  getData: (table) => ipcRenderer.invoke('get-data', table),
  createData: (name) => ipcRenderer.invoke('create-data', name),
});

contextBridge.exposeInMainWorld("electron", {
  selectFile: () => ipcRenderer.invoke("select-file"),
  readExcel: (file) => ipcRenderer.invoke("read-excel", file),
});