const { contextBridge, ipcRenderer } = require("electron")

// should be called only once
contextBridge.exposeInMainWorld("data", {
    path: __dirname,
    minimizeWindow() {
        // if we call sendSync, then main.js must reply a value or the window will freeze for a while
        ipcRenderer.send("minimize-window")
    },
    maximizeWindow() {
        ipcRenderer.send("maximize-window")
    },
    closeWindow: () => {
        // To close app we should use ipc, instead of require app and call app.quit() directly
        ipcRenderer.send("close-window")
    }
})
