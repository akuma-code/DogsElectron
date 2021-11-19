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
        width: 1350,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,

            // preload: path.join(__dirname, "loader.js")
        },
        useContentSize: true
    });
    return win
}


app.whenReady().then(() => {
    createWindow().loadFile("public/welcome.html")
    ipcMain.on('msg', (event, arg) => {
        console.log('main process: ', arg) // prints "ping"
        event.sender.send('msg', 'msg recieved!')
    })
    // ipcMain.on('msg', (event, arg) => {
    //     console.log(arg) // prints "ping"
    //     event.returnValue = `get ${arg}`
    // })
})