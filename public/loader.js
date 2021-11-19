const {
    ipcRenderer
} = require("electron");

document.querySelector('#ed').addEventListener('click', (event) => {
    const target = event.target;
    const {
        link
    } = target.dataset;


    ipcRenderer.send('msg', `loader send: ${link}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('mainEvent response: ', ...args))

}, true);


document.querySelector('#vi').addEventListener('click', (event) => {
    const target = event.target;
    const {
        link
    } = target.dataset;

    ipcRenderer.send('msg', `to main.event: ${link}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('from main.event.sender:', ...args))

}, true)