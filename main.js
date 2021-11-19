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

function openLink(type) {
    const win = (w, h) => new BrowserWindow({

        width: w,
        height: h,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        useContentSize: true
    });
    if (type === 'edit') return win(1350, 1000)
    else return win(600, 1000)
}

app.whenReady().then(() => {
    createWindow().loadFile("public/welcome.html")
    ipcMain.on('msg', (event, arg) => {
        if (arg == 'edit') {
            openLink('edit').loadFile("app/dogedit.html")
        };
        if (arg == 'view') {
            openLink('view').loadFile("app/dogview.html")
        };
        console.log('main process: ', arg)
        event.sender.send('msg', arg)
    })

})