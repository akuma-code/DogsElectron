const {
    ipcRenderer,
} = require("electron");

document.querySelector('#zcalc').addEventListener('click', (event) => {
    const target = event.target;
    const {
        app
    } = target.dataset;


    ipcRenderer.send('msg', `${app}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('mainEvent response: ', ...args))

}, true);


document.querySelector('#tps').addEventListener('click', (event) => {
    const target = event.target;
    const {
        app
    } = target.dataset;

    ipcRenderer.send('msg', `${app}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('from main.event.sender:', ...args))

}, true)