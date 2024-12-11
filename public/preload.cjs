const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("database", {
  getData: (table) => ipcRenderer.invoke("get-data", table),
  createData: (tableName, fields, values) =>
    ipcRenderer.invoke("create-data", tableName, fields, values),
});

contextBridge.exposeInMainWorld("electron", {
  selectFile: () => ipcRenderer.invoke("select-file"),
  readExcel: (file) => ipcRenderer.invoke("read-excel", file),
});