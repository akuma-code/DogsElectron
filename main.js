const {
    app
} = require('electron');
// const {
//     handleSquirrelEvent
// } = require("./handleSquirrelEvent");
// if (handleSquirrelEvent()) {
//     // squirrel event handled and app will exit in 1000ms, so don't do anything else
//     return;
// }
// if (require('electron-squirrel-startup')) return app.quit();

const {
    BrowserWindow,
    ipcMain,
} = require('electron')
const path = require('path');




function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        useContentSize: false
    });
    return win
}

function openLink(w, h) {
    const aapp = new BrowserWindow({
        width: w,
        height: h,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    return aapp
}

app.whenReady().then(() => {
    createWindow().loadFile("public/homepage.html")


    ipcMain.on('msg', (_, arg) => {

        console.log('arg: ', arg)
        // event.sender.send('msg', arg)
        if (arg == 'zcalc') {
            openLink(1350, 900).loadFile(path.join(__dirname, "apps/zcalc", "zindex.html"))
        }
        if (arg == 'tps') {
            openLink(650, 750).loadFile(path.join(__dirname, "apps/tps", "index.html"));
        }
    })
})