const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path');

const ROOT_PATH = `${path.join(__dirname)}`;
const DOGS_PATH = `${ROOT_PATH}/dogs`;

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "src", "preload.js")
        }
    });

    win.loadFile("public/welcome.html")
}

app.whenReady().then(() => {
    createWindow()
})