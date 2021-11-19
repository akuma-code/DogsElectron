const {
    app,
    BrowserWindow,
    ipcMain,
    webPreferences
} = require('electron')
const path = require('path');

const ROOT_PATH = `${path.join(__dirname)}`;
const DOGS_PATH = `${ROOT_PATH}/dogs`;

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 250,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        useContentSize: true
    });
    return win
}

function openLink() {
    return new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        useContentSize: true
    })
}

app.whenReady().then((resolve) => {
    createWindow().loadFile("public/welcome.html")
    ipcMain.on('msg', (event, arg) => {
        () => resolve(arg)

        console.log('main process: ', arg)
        event.sender.send('msg', arg)
    })

}).then(function (result) {
    console.log('zzzz')
    if (result == 'zcalc') {
        () => openLink({
            width: 600,
            height: 800
        }).loadFile("app/dogedit.html");

    };
    if (result == 'tps') {
        () => openLink({
            width: 900,
            height: 500
        }).loadFile("app/dogview.html");

    };
})