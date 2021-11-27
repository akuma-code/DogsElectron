const {
    BrowserWindow,
    ipcMain,
    app
} = require('electron');

const {
    handleSquirrelEvent
} = require("./handleSquirrelEvent");

if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    console.log('STOPPED!')
    return;
}
// if (require('electron-squirrel-startup')) return app.quit();


const path = require('path');




function createWindow() {
    const win = new BrowserWindow({
        width: 310,
        height: 220,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        useContentSize: true
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

        console.log('app: ', arg)
        // event.sender.send('msg', arg)
        if (arg == 'zcalc') {
            openLink(1400, 900).loadFile(path.join(__dirname, "apps/zcalc", "zindex.html"))
        }
        if (arg == 'tps') {
            openLink(630, 750).loadFile(path.join(__dirname, "apps/tps", "index.html"));
        }

    })
})