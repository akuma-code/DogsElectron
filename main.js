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
    const app = new BrowserWindow({
        width: w,
        height: h,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    return app
}

app.whenReady().then((resolve) => {
    createWindow().loadFile("public/homepage.html")
    ipcMain.on('msg', (_, arg) => {

        console.log('arg: ', arg)
        // event.sender.send('msg', arg)
        if (arg == 'zcalc') {
            openLink(1350, 900).loadFile(path.join(__dirname, "apps/zcalc", "zindex.html"))
        }
        if (arg == 'tps') {
            openLink(650, 750).loadFile(path.join(__dirname, "apps/tps", "index.html"));
        };
    })

})
// .then((result) => {
//     console.log('zzzz:', result)
//     if (result == 'zcalc') {
//         openLink({
//             width: 600,
//             height: 800,
//             useContentSize: false
//         }).loadFile("/apps/zcalc/zindex.html");

//     };
//     if (result == 'tps') {
//         () => openLink({
//             width: 900,
//             height: 500,
//             useContentSize: false
//         }).loadFile("/apps/tps/index.html");

//     };
// })