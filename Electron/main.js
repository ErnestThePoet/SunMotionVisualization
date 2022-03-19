const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

function createWindow() {
    const window = new BrowserWindow({
        width: 1350,
        height: 750,
        minWidth: 1350,
        minHeight: 750,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools:false
        },
        frame: false
    })

    window.loadFile("index.html")
}

app.whenReady().then(function () {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

ipcMain.on("close-window", (event, arg) => {
    app.quit()
})

ipcMain.on("minimize-window", (event, arg) => {
    BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.on("maximize-window", (event, arg) => {
    if (BrowserWindow.getFocusedWindow().isMaximized()) {
        BrowserWindow.getFocusedWindow().unmaximize()
    }
    else {
        BrowserWindow.getFocusedWindow().maximize()
    }
})