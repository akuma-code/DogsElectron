const {
    ipcRenderer
} = require("electron");

document.querySelector('#ed').addEventListener('click', (event) => {
    const target = event.target;
    const {
        link
    } = target.dataset;

    // ipcRenderer
    // .invoke('msg', 'ping')
    ipcRenderer.send('msg', `to main.event: ${link}`)
    // .then((reply) => console.log(reply))
    ipcRenderer.on('msg', (_, ...args) => console.log('from main.event.sender:', ...args))

    console.log('Done!')
}, true)